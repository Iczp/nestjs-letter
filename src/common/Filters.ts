import e from 'dbschema/edgeql-js'; // auto-generated code
// import { $bool } from 'dbschema/edgeql-js/modules/std';
// import { Cardinality, TypeSet } from 'dbschema/edgeql-js/reflection';
// import { $ } from 'edgedb';

/**
 * 条件过滤器
 */
export class Filters /** <T extends TypeSet<$bool, Cardinality>> */ {
  private array: any[] = [];

  constructor(initialArray: any[] = []) {
    this.array = [...initialArray];
  }

  add(value: any): this {
    this.array.push(value);
    return this;
  }

  /**
   * 条件添加
   * @param condition 条件 True
   * @param value  Fundtion | value
   */

  addIf(condition: boolean, value: any): this {
    if (condition) {
      if (typeof value === 'function') {
        this.array.push(value());
      } else {
        this.array.push(value);
      }
    }
    return this;
  }

  /**
   * 返回数组的副本以保持不可变性
   */
  toArray(): any[] {
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
