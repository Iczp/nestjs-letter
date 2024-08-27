import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Gender, UserType } from 'dbschema/interfaces';
import { GetListInput } from 'src/bases/GetListInput';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';
import { UserTypeEnums, UserTypeKeys } from 'src/enums/UserType';

export class UserGetListInput extends GetListInput {
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

  @IsBoolean()
  @ApiProperty()
  is_enabled?: boolean;
}
