import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { FileUploadInput } from 'src/dtos/FileUploadInput';
import { PagedResult } from 'src/dtos/PagedResultDto';

export class ActivityCreateInput {
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @ApiProperty()
  @IsOptional()
  public cover_url?: string;

  @ApiProperty()
  @IsOptional()
  public description?: string;

  @ApiProperty()
  @IsOptional()
  public address?: string;

  @ApiProperty()
  @IsOptional()
  public content?: string;

  @ApiProperty()
  @IsInt()
  public max_count: number;

  @ApiProperty()
  @IsOptional()
  public start_time?: Date;

  @ApiProperty()
  @IsOptional()
  public end_time?: Date;

  @ApiProperty()
  public is_actived: boolean;
}

export class ActivityUpdateInput extends ActivityCreateInput {
  @ApiProperty()
  public is_enabled: boolean;
}

export class ActivityDto extends BaseEntityDto {
  @IsNotEmpty()
  @ApiProperty({ description: '活动标题' })
  title: string;

  @ApiProperty({ description: '封面地址' })
  cover_url?: string;

  @ApiProperty({ description: '活动简介' })
  description?: string;

  @ApiProperty({ description: '参与人数量' })
  max_count?: number;

  @ApiProperty({ description: '客户数量' })
  customers_count?: number;

  @ApiProperty({ description: '邀请人数量' })
  inviter_configs_count?: number;

  @ApiProperty({ description: '开始时间' })
  start_time?: Date;

  @ApiProperty({ description: '结束时间' })
  end_time?: Date;

  @ApiProperty({ description: '是否活跃' })
  is_actived?: boolean;

  @ApiProperty({ description: '是否设置了图片模板' })
  is_image_seted?: boolean;

  @ApiProperty({ description: '是否可用' })
  is_enabled?: boolean;
}

export class CropBoxDto {
  @ApiProperty()
  left?: number;
  @ApiProperty()
  top?: number;
  @ApiProperty()
  width?: number;
  @ApiProperty()
  height?: number;
}

export class CropDataDto {
  @ApiProperty()
  x?: number;
  @ApiProperty()
  y?: number;
  @ApiProperty()
  width?: number;
  @ApiProperty()
  height?: number;
  @ApiProperty()
  rotate?: number;
  @ApiProperty()
  scaleX?: number;
  @ApiProperty()
  scaleY?: number;
}

export class CropDto {
  @ApiProperty({ description: '剪裁数据信息', type: CropDataDto })
  data?: CropDataDto;
  @ApiProperty({ description: '剪裁框信息', type: CropBoxDto })
  box?: CropBoxDto;
}

export class ActivityDetailDto extends ActivityDto {
  @ApiProperty({ description: '活动说明' })
  content?: string;

  @ApiProperty({ description: '模板图片base64' })
  image_base64?: string;

  @ApiProperty({ description: '图片类型' })
  image_mimetype?: string;

  @ApiProperty({ description: '模板二维码图片位置信息', type: CropDto })
  image_crop?: CropDto;

  @ApiProperty({ description: '图片大小' })
  image_size?: number;

  @ApiProperty({ description: '是否设置了图片模板' })
  is_image_seted?: boolean;

  @ApiProperty({ description: '图片模板修改时间' })
  image_last_modification_time?: Date;

  @ApiProperty({
    description:
      '二维码模板, 变量 {{id}} 如： https://iczp.net/letter?id={{id}}',
  })
  qrcode_template?: string;
}

export class ActivityTemplageDto extends BaseEntityDto {
  @ApiProperty({ description: '模板图片base64' })
  image_base64?: string;

  @ApiProperty({ description: '模板二维码图片位置信息', type: CropDto })
  image_crop?: CropDto;
}

export class ActivityTemplageInput extends FileUploadInput {
  @ApiProperty({
    required: true,
    description: '二维码图片剪裁信息',
    type: CropDto,
  })
  public body?: CropDto;
}

export class ActivityGetListInput extends GetListInput {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_enabled?: boolean;

  @ApiProperty({
    required: false,
    description: '用户ID',
  })
  public user_id?: string;

  @ApiProperty({
    required: false,
    description: 'ERP用户ID',
  })
  public erp_user_id?: string;

  @ApiProperty({
    required: false,
    description: '起始时间',
  })
  public start_time?: Date;

  @ApiProperty({
    required: false,
    description: '结束时间',
  })
  public end_time?: Date;
}

export class ActivityPagedResult extends PagedResult {
  constructor(totalCount: number, items: ActivityDto[]) {
    super(totalCount, items);
  }
  @ApiProperty({
    type: [ActivityDto],
  })
  public override items: ActivityDto[];
}
