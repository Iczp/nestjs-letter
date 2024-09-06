import { ApiProperty } from '@nestjs/swagger';

export class SetPermissionsInput {
  @ApiProperty({
    description: '权限列表',
  })
  permisstions: string[];
}
