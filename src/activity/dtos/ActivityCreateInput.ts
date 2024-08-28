import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

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
