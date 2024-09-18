export class PagedResultDto<T> {
  constructor(totalCount: number, items: T[]) {
    // super();

    this.totalCount = totalCount;
    this.items = items;
  }
  input?: any;
  totalCount: number;
  items: T[];
}
