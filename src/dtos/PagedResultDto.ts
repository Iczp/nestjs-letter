import { ApiProperty } from '@nestjs/swagger';

export class PagedResult {
  constructor(totalCount: number, items: any[]) {
    this.totalCount = totalCount;
    this.items = items;
  }
  @ApiProperty({ required: false, description: '输入参数' })
  public input?: any;
  @ApiProperty({ description: '总数' })
  public totalCount: number;
  @ApiProperty({ description: '列表项' })
  public items: any;
}

export class PagedResultDto<T> extends PagedResult {
  constructor(totalCount: number, items: T[]) {
    super(totalCount, items);
  }
  @ApiProperty({ description: '列表项' })
  public override items: T[];
}
