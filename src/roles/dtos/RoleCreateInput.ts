import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleUpdateInput } from './RoleUpdateInput';

export class RoleCreateInput extends RoleUpdateInput {
  @IsNotEmpty()
  @ApiProperty()
  code!: string;

  @ApiProperty({
    description: '是否固定',
    default: false,
    required: false,
  })
  is_static?: boolean;
}
