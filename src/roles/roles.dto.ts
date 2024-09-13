import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';

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

export class RoleDetailDto extends RoleDto {}

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

export class SetPermissionsInput {
  @ApiProperty({
    description: '权限列表',
  })
  permissions: string[];
}
