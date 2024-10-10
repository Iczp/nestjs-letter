import { Injectable } from '@nestjs/common';

import { ActivityCustomerGetListInput } from './activity-customer.dto';
import { BaseActivityCustomerService } from './activity-customer.service.base';

import { ActivityCustomer, Activity } from 'dbschema/interfaces';
// import sharp from 'sharp';
// import QRCode from 'qrcode';
import * as sharp from 'sharp';
import * as QRCode from 'qrcode';
import { QrCodeOptions } from './types';
import { CropDto } from 'src/activities/activities.dto';

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
    const base64str = activity.image_base64;
    const image_crop = (
      typeof activity.image_crop == 'string'
        ? JSON.parse(activity.image_crop)
        : activity.image_crop
    ) as CropDto;

    // 将 base64 背景图片转换为 Buffer
    const backgroundImageBuffer = Buffer.from(base64str, 'base64');
    // 生成二维码
    const qrData = `http://localhost:3000/letter/${id}`;
    const qrCodeBuffer = await QRCode.toBuffer(qrData, {
      width: image_crop.data.width, // 设置二维码的宽度
      height: image_crop.data.height, // 设置二维码的高度
      color: {
        dark: '#000000', // 设置二维码的颜色（前景色）
        light: '#ffffff', // 设置二维码的背景色
      },
    });
    // 合成图片：将二维码放置在背景图片的指定位置
    const backgroundImage = sharp(backgroundImageBuffer);
    const outputImage = await backgroundImage
      // .resize(
      //   Math.floor(image_crop.data.width),
      //   Math.floor(image_crop.data.height),
      // ) // 设置背景图片的尺寸
      .composite([
        {
          input: qrCodeBuffer,
          left: Math.floor(image_crop.data.x), // 二维码距离图片左侧的距离
          top: Math.floor(image_crop.data.y), // 二维码距离图片顶部的距离
          // blend: 'dest-in', // 混合模式
        },
      ])
      .toBuffer();

    // const outputImage = await this.synthesizeImage(backgroundImageBuffer);
    return {
      buffer: outputImage,
      filename: `${activity.title}(${entity.customer_name}).png`,
    };
  }

  protected async generateQRCode(id: string, { size = 200 }: QrCodeOptions) {
    // 生成二维码
    const data = `http://localhost:3000/letter/${id}`;

    const qrCodeBuffer = await QRCode.toBuffer(data, {
      width: size, // 设置二维码的宽度
      height: size, // 设置二维码的高度
      color: {
        dark: '#000000', // 设置二维码的颜色（前景色）
        light: '#ffffff', // 设置二维码的背景色
      },
    });

    return qrCodeBuffer;
  }

  protected async synthesizeImage(buffer: Buffer) {
    const qrCodeBuffer = await this.generateQRCode('123', { size: 200 });
    // 合成图片：将二维码放置在背景图片的指定位置
    const backgroundImage = sharp(buffer);
    const outputImage = await backgroundImage
      .resize(200, 200) // 设置背景图片的尺寸
      .composite([
        {
          input: qrCodeBuffer,
          top: 10, // 二维码距离图片顶部的距离
          left: 10, // 二维码距离图片左侧的距离
          blend: 'dest-in', // 混合模式
        },
      ])
      .toBuffer();

    return outputImage;
  }
}
