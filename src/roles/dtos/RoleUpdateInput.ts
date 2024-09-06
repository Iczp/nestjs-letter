import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleUpdateInput {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: '是否公开',
    default: true,
  })
  is_public?: boolean;

  @ApiProperty({
    description: '是否默认',
    default: false,
  })
  is_default?: boolean;

  @ApiProperty({
    description: '是否启用',
    default: true,
  })
  is_enabled?: boolean;
}
