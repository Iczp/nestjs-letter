import { ApiProperty } from '@nestjs/swagger';

import { BaseEntityDto } from 'src/dtos/BaseEntityDto';

export class RoleDto extends BaseEntityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code!: string;

  @ApiProperty({
    description: '是否公开',
  })
  is_public?: boolean;

  @ApiProperty({
    description: '是否固定',
  })
  is_static?: boolean;

  @ApiProperty({
    description: '是否默认',
  })
  is_default?: boolean;

  @ApiProperty({
    description: '是否启用',
  })
  is_enabled?: boolean;
}
