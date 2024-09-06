import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleUpdateInput {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: '是否公开',
  })
  is_public?: boolean;

  @ApiProperty({
    description: '是否默认',
  })
  is_default?: boolean;

  @ApiProperty({
    description: '是否启用',
  })
  is_enabled?: boolean;
}
