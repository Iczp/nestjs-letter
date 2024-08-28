import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Gender } from 'dbschema/interfaces';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { GenderEnums, GenderKeys } from 'src/enums/Gender';

export class ActivityCustomerDto extends BaseEntityDto {
  @IsNotEmpty()
  @ApiProperty()
  public customer_name: string;

  @ApiProperty()
  public customer_phone?: string;

  // @IsIn(GenderKeys)
  @ApiProperty({
    default: GenderEnums[GenderEnums.Unknown],
    enum: GenderKeys,
  })
  public customer_gender?: Gender;

  @ApiProperty()
  public remarks?: string;

  @ApiProperty()
  public inviter_name?: string;

  @ApiProperty()
  public is_invited?: boolean;

  @ApiProperty()
  public is_checked?: boolean;

  @ApiProperty()
  public is_enabled?: boolean;
}
