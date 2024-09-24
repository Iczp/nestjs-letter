import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityDto {
  @ApiProperty({ description: 'id' })
  id: string;

  @ApiProperty({ description: '创建时间' })
  creation_time?: Date | null;

  @ApiProperty({ description: '最后修改时间' })
  last_modification_time?: Date | null;

  @ApiProperty({ description: '是否可用' })
  is_enabled?: boolean | null;

  @ApiProperty({ description: '删除时间' })
  deletion_time?: Date | null;

  @ApiProperty({ description: '是否删除' })
  is_deleted?: boolean | null;
}
