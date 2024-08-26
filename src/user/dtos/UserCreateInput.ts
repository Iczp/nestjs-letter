import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Gender, UserType } from 'dbschema/interfaces';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';
import { UserTypeEnums, UserTypeKeys } from 'src/enums/UserType';

export class UserCreateInput {
  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @ApiProperty({
    default: UserTypeEnums[UserTypeEnums.Unknown],
    enum: UserTypeKeys,
  })
  userType?: UserType;

  //   @IsInt()
  @ApiProperty({
    default: GenderEnums[GenderEnums.Unset],
    enum: GenderKeys,
  })
  gender?: Gender;

  @ApiProperty()
  phone?: string;

  //   @IsInt()
  //   @ApiProperty()
  //   max_count?: number;

  @IsBoolean()
  @ApiProperty()
  is_enabled?: boolean;
}
