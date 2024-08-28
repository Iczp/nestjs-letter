import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';

export class ActivityCustomerGetListInput extends GetListInput {
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
