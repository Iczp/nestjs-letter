export class PagedResult {
  constructor(totalCount: number, items: any[]) {
    this.totalCount = totalCount;
    this.items = items;
  }
  input?: any;
  totalCount: number;
  items: any;
}

export class PagedResultDto<T> extends PagedResult {
  constructor(totalCount: number, items: T[]) {
    super(totalCount, items);
  }

  override items: T[];
}
