import { Injectable } from '@nestjs/common';
import { ActivityCustomerGetListInput } from './activity-customer.dto';
import { BaseActivityCustomerService } from './activity-customer.service.base';
import { ActivityCustomer, Activity } from 'dbschema/interfaces';
// import sharp from 'sharp';
// import QRCode from 'qrcode';
import * as sharp from 'sharp';
import * as QRCode from 'qrcode';
import { CropDataDto, CropDto } from 'src/activities/activities.dto';

@Injectable()
export class ActivityCustomerService extends BaseActivityCustomerService<ActivityCustomerGetListInput> {
  constructor() {
    super();
  }

  public async generateLetter(id: string) {
    const entity = await this.getEntityById<ActivityCustomer>(id, (entity) => ({
      ...entity['*'],
      inviterConfig: {
        activity: {
          ...entity.activity['*'],
          // id: true,
          // title: true,
          // image_base64: true,
          // image_crop: true,
          // is_image_seted: true,
          // image_mimetype: true,
        },
      },
      // activity: { id: true },
    }));
    const activity = (entity as any).inviterConfig.activity as Activity;

    const image_crop = (
      typeof activity.image_crop == 'string'
        ? JSON.parse(activity.image_crop)
        : activity.image_crop
    ) as CropDto;

    const qrcode_template =
      activity.qrcode_template || `http://localhost:3000/letter/{{id}}`;

    const qrData = this.formatQrData(qrcode_template, {
      id: entity.id,
    });

    // 将 base64 背景图片转换为 Buffer
    const backgroundImageBuffer = Buffer.from(activity.image_base64, 'base64');

    const outputImage = await this.synthesizeImage(
      backgroundImageBuffer,
      qrData,
      image_crop.data,
    );
    return {
      buffer: outputImage,
      filename: `${activity.title}(${entity.customer_name}).png`,
    };
  }

  protected formatQrData(tmp: string, data: { [key: string]: string }) {
    let text = tmp;
    for (const key in data) {
      text = text.replace(`{{${key}}}`, data[key]);
    }
    return text;
  }

  protected async synthesizeImage(
    backgroundImageBuffer: Buffer,
    qrData: string,
    cropData: CropDataDto,
  ) {
    // 生成二维码
    const qrCodeBuffer = await QRCode.toBuffer(qrData, {
      width: cropData.width, // 设置二维码的宽度
      height: cropData.height, // 设置二维码的高度
      color: {
        dark: '#000000', // 设置二维码的颜色（前景色）
        light: '#ffffff', // 设置二维码的背景色
      },
    });

    // 合成图片：将二维码放置在背景图片的指定位置
    const backgroundImage = sharp(backgroundImageBuffer);
    const outputImage = await backgroundImage
      .composite([
        {
          input: qrCodeBuffer,
          left: Math.floor(cropData.x), // 二维码距离图片左侧的距离
          top: Math.floor(cropData.y), // 二维码距离图片顶部的距离
          // blend: 'dest-in', // 混合模式
        },
      ])
      .toBuffer();

    return outputImage;
  }
}
