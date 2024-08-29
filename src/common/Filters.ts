import e, { Cardinality } from 'dbschema/edgeql-js'; // auto-generated code
import { $bool } from 'dbschema/edgeql-js/modules/std';
import { TypeSet } from 'dbschema/edgeql-js/reflection';

/**
 * 条件过滤器
 */
export class Filters<T extends TypeSet<$bool, Cardinality>> {
  private array: T[] = [];

  constructor(initialArray: T[] = []) {
    this.array = [...initialArray];
  }

  /**
   * 条件添加
   * @param condition 条件 True
   * @param value
   */

  addIf(condition: boolean, value: T): this {
    if (condition) {
      this.array.push(value);
    }
    return this;
  }

  /**
   * 返回数组的副本以保持不可变性
   */
  toArray(): T[] {
    return [...this.array];
  }

  /**
   * e.all(e.set(...this.array));
   */
  all() {
    return e.all(e.set(...this.array));
  }

  /**
   * e.any(e.set(...this.array));
   */
  any() {
    return e.any(e.set(...this.array));
  }
}
