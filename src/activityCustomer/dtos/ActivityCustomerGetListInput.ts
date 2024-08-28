import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { GetListInput } from 'src/bases/GetListInput';

export class ActivityCustomerGetListInput extends GetListInput {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  public is_enabled?: boolean;
}
