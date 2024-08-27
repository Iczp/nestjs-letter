import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn } from 'class-validator';
import { Gender, UserType } from 'dbschema/interfaces';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';
import { UserTypeEnums, UserTypeKeys } from 'src/enums/UserType';

export class UserCreateInput {
  @IsNotEmpty()
  @ApiProperty()
  public name!: string;

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
