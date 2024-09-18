import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn, IsOptional, IsBoolean } from 'class-validator';
import { Gender, UserType } from 'dbschema/interfaces';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';
import { UserTypeEnums, UserTypeKeys } from 'src/enums/UserType';

export class UserCreateInput {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'password',
  })
  public account!: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'password',
  })
  public passoword!: string;

  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @ApiProperty({
    default: UserTypeEnums[UserTypeEnums.Unset],
    enum: UserTypeKeys,
  })
  @IsIn(UserTypeKeys)
  public userType?: UserType;

  @IsIn(GenderKeys)
  @ApiProperty({
    default: GenderEnums[GenderEnums.Unknown],
    enum: GenderKeys,
  })
  public gender?: Gender;

  @ApiProperty()
  public phone?: string;

  @ApiProperty()
  public is_enabled: boolean;

  //   @IsInt()
  //   @ApiProperty()
  //   max_count?: number;
}

export class UserAutoCreateInput extends UserCreateInput {
  @ApiProperty()
  public erp_user_id?: string;
}

export class UserDto extends BaseEntityDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  account: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  user_type?: UserType;

  @ApiProperty()
  is_enabled?: boolean;

  @ApiProperty()
  erp_user_id?: string;
}

export class UserUpdateInput extends UserCreateInput {}

export class UserDetailDto extends UserDto {}

export class UserGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
    description: '角色ID/角色名称/角色code',
  })
  public role?: string;

  @ApiProperty({
    required: false,
    description: 'ERP 用户ID',
  })
  public erp_user_id?: string;

  @ApiProperty({
    required: false,
    // default: UserTypeEnums[UserTypeEnums.Unset],
    enum: UserTypeKeys,
  })
  @IsIn(UserTypeKeys)
  public userType?: UserType;

  @IsIn(GenderKeys)
  @ApiProperty({
    required: false,
    // default: GenderEnums[GenderEnums.Unknown],
    enum: GenderKeys,
  })
  public gender?: Gender;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_enabled?: boolean;
}

// export class ArgsInput {
//   @Req() req: any;
//   @Body() body: any;
// }
