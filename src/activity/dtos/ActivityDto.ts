import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserType } from 'dbschema/interfaces';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';

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
