import { ApiProperty } from '@nestjs/swagger';

import { ActivityCustomerUpdateInput } from './ActivityCustomerUpdateInput';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ActivityCustomerCreateInput extends ActivityCustomerUpdateInput {
  @IsNotEmpty({ message: '活动id不能为空' })
  @ApiProperty()
  @IsUUID('all', { message: '活动id格式错误' })
  public activity_id!: string;
}
