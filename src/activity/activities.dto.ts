import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { UserType } from 'dbschema/interfaces';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';

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
  name!: string;

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
    default: true,
  })
  public is_enabled?: boolean;
}
