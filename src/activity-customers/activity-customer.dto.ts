import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Gender } from 'dbschema/interfaces';
import { ActivityDto } from 'src/activities/activities.dto';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { PagedResult } from 'src/dtos/PagedResultDto';
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

  @ApiProperty({
    type: () => ActivityDto,
  })
  public activity?: ActivityDto;
}

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

export class ActivityCustomerCreateInput extends ActivityCustomerUpdateInput {
  @IsNotEmpty({ message: '活动id不能为空' })
  @ApiProperty()
  @IsUUID('all', { message: '活动id格式错误' })
  public activity_id!: string;
}

export class ActivityCustomerDetailDto extends ActivityCustomerDto {}

export class ActivityCustomerGetListInput extends GetListInput {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    description: '活动Id',
  })
  public activity_id?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    description: '邀请人用户Id',
  })
  public inviter_user_id?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    description: '邀请人用户ErpUserId',
  })
  public inviter_erp_user_id?: string;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_invited?: boolean;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_checked?: boolean;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    required: false,
    description: '是否可用',
  })
  public is_enabled?: boolean;
}

export class ActivityCustomerPagedResult extends PagedResult {
  constructor(totalCount: number, items: ActivityCustomerDto[]) {
    super(totalCount, items);
  }
  override items: ActivityCustomerDto[];
}
