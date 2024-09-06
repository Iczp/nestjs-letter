import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';

export class RoleGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
  })
  public role_id?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public is_enabled?: boolean;
}
