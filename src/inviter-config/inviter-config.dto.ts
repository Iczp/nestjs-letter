import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { PagedResult } from 'src/dtos/PagedResultDto';

export class InviterConfigUpdateInput {
  @IsNotEmpty()
  @ApiProperty({
    default: 1,
    description: '最大邀请人数',
  })
  max_count: number;

  @ApiProperty({
    description: '是否启用',
    default: true,
  })
  is_enabled?: boolean;
}

export class InviterConfigCreateInput extends InviterConfigUpdateInput {
  @ApiProperty({
    required: true,
    description: '活动ID',
    default: '',
  })
  activity_id: string;

  @ApiProperty({
    required: true,
    description: '邀请人用户ID',
    default: '',
  })
  inviter_user_id: string;
}

export class InviterConfigDto extends BaseEntityDto {
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

export class InviterConfigDetailDto extends InviterConfigDto {}

export class InviterConfigGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
    description: '活动ID',
  })
  activity_id?: string;

  @ApiProperty({
    required: false,
    description: '邀请人用户ID',
  })
  inviter_user_id?: string;

  @ApiProperty({
    required: false,
    description: '邀请人ERP User ID',
  })
  inviter_erp_user_id?: string;
}

export class InviterConfigPagedResult extends PagedResult {
  constructor(totalCount: number, items: InviterConfigDto[]) {
    super(totalCount, items);
  }
  @ApiProperty({
    type: [InviterConfigDto],
  })
  public override items: InviterConfigDto[];
}
