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
    if (initialArray) {
      this.array = [...initialArray];
    }
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
    if (this.array.length === 0) {
      return undefined;
    }
    return e.all(e.set(...this.array));
  }

  /**
   * e.any(e.set(...this.array));
   */
  any() {
    return e.any(e.set(...this.array));
  }

  /**
   * e.any(e.set(...this.array));
   */
  and() {
    return this.op('and');
  }

  or() {
    return this.op('or');
  }

  private op(opt: 'and' | 'or') {
    if (this.array.length === 0) {
      return undefined;
    }
    if (this.array.length === 1) {
      return this.array[0];
    }
    let op = e.op(this.array[0], opt, this.array[1]);
    for (let i = 2; i < this.array.length; i++) {
      op = e.op(op, opt, this.array[i]);
    }
    return op;
  }
}
