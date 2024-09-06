import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';

export class RoleGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
    description: '是否公开',
  })
  is_public?: boolean;

  @ApiProperty({
    required: false,
    description: '是否固定',
  })
  is_static?: boolean;

  @ApiProperty({
    required: false,
    description: '是否默认',
  })
  is_default?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_enabled?: boolean;
}
