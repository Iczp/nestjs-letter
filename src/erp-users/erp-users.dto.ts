import { ApiProperty } from '@nestjs/swagger';
import { GetListInput } from 'src/bases/GetListInput';

export class ErpUsersGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
    description: 'http_status',
  })
  http_status?: number;
}
