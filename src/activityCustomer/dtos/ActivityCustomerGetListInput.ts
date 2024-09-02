import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';

export class ActivityCustomerGetListInput extends GetListInput {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    default: null,
    description: '活动Id',
  })
  public activity_id?: string;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    required: false,
    default: null,
  })
  public is_invited?: boolean;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    required: false,
    default: null,
  })
  public is_checked?: boolean;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    required: false,
    default: null,
    description: '是否可用',
  })
  public is_enabled?: boolean;
}
