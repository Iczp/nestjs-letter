import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { Gender, UserType } from 'dbschema/interfaces';
import { GetListInput } from 'src/bases/GetListInput';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';
import { UserTypeEnums, UserTypeKeys } from 'src/enums/UserType';

export class UserGetListInput extends GetListInput {
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

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  public is_enabled?: boolean;
}
