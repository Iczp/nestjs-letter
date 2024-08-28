export class AddIf<T> {
  private array: T[] = [];

  constructor(initialArray: T[] = []) {
    this.array = [...initialArray];
  }

  addIf(condition: boolean, value: T): this {
    if (condition) {
      this.array.push(value);
    }
    return this;
  }

  toArray(): T[] {
    return [...this.array]; // 返回数组的副本以保持不可变性
  }
}
