import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { Gender, UserType } from 'dbschema/interfaces';
import { GetListInput } from 'src/bases/GetListInput';
import { GenderKeys } from 'src/enums/Gender';
import { UserTypeKeys } from 'src/enums/UserType';

export class UserGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
  })
  public role_id?: string;

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
