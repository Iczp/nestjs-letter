import { ApiProperty } from '@nestjs/swagger';
import { ActivityCreateInput } from './ActivityCreateInput';

export class ActivityUpdateInput extends ActivityCreateInput {
  @ApiProperty()
  public is_enabled: boolean;
}
