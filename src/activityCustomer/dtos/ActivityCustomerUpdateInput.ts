import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Gender } from 'dbschema/interfaces';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';

export class ActivityCustomerUpdateInput {
  @IsNotEmpty()
  @ApiProperty()
  public customer_name!: string;

  @IsIn(GenderKeys)
  @ApiProperty({
    default: GenderEnums[GenderEnums.Unknown],
    enum: GenderKeys,
  })
  public customer_gender?: Gender;

  @ApiProperty()
  public customer_phone?: string;

  @ApiProperty()
  public inviter_name!: string;

  // @ApiProperty({
  //   default: false,
  // })
  // public is_checked: boolean;

  // @ApiProperty({
  //   default: false,
  // })
  // public is_invited: boolean;

  @ApiProperty({
    default: true,
  })
  public is_enabled: boolean;
}
