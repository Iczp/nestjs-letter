import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { UserType } from 'dbschema/interfaces';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { PagedResult } from 'src/dtos/PagedResultDto';

export class ActivityCreateInput {
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @ApiProperty()
  @IsOptional()
  public coverUrl?: string;

  @ApiProperty()
  @IsOptional()
  public description?: string;

  @ApiProperty()
  @IsOptional()
  public address?: string;

  @ApiProperty()
  @IsOptional()
  public content?: string;

  @ApiProperty()
  @IsInt()
  public max_count: number;

  @ApiProperty()
  @IsOptional()
  public start_time?: Date;

  @ApiProperty()
  @IsOptional()
  public end_time?: Date;

  @ApiProperty()
  public is_actived: boolean;
}

export class ActivityUpdateInput extends ActivityCreateInput {
  @ApiProperty()
  public is_enabled: boolean;
}

export class ActivityDto extends BaseEntityDto {
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  user_type?: UserType;

  @ApiProperty()
  is_enabled?: boolean;
}

export class ActivityDetailDto extends ActivityDto {}

export class ActivityGetListInput extends GetListInput {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_enabled?: boolean;

  @ApiProperty({
    required: false,
    description: '用户ID',
  })
  public user_id?: string;

  @ApiProperty({
    required: false,
    description: 'ERP用户ID',
  })
  public erp_user_id?: string;

  @ApiProperty({
    required: false,
    description: '起始时间',
  })
  public start_time?: Date;

  @ApiProperty({
    required: false,
    description: '结束时间',
  })
  public end_time?: Date;
}

export class ActivityPagedResult extends PagedResult {
  constructor(totalCount: number, items: ActivityDto[]) {
    super(totalCount, items);
  }
  @ApiProperty({
    type: [ActivityDto],
  })
  public override items: ActivityDto[];
}
