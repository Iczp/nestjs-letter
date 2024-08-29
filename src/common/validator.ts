export const isBool = <T>(val: T): boolean =>
  typeof val === 'boolean' || val === true || val === false;

export const isUndefined = <T>(val: T): boolean => typeof val === 'undefined';

export const isNull = <T>(val: T): boolean => val === null;

export const isString = <T>(val: T): boolean => typeof val === 'string';

export const isNumber = <T>(val: T): boolean => typeof val === 'number';

export const isArray = <T>(val: T): boolean => Array.isArray(val);

export const isObject = <T>(val: T): boolean => typeof val === 'object';

export const isFunction = <T>(val: T): boolean => typeof val === 'function';

export const isPromise = <T>(val: T): boolean => val instanceof Promise;

export const isDate = <T>(val: T): boolean => val instanceof Date;

export const isRegExp = <T>(val: T): boolean => val instanceof RegExp;

export const isError = <T>(val: T): boolean => val instanceof Error;

export const isSymbol = <T>(val: T): boolean => typeof val === 'symbol';

export const isMap = <T>(val: T): boolean => val instanceof Map;

/**
 * Checks if given value is empty (=== '', === null, === undefined, isArray and length > 0).
 */
export const isEmpty = <T>(val: T): boolean =>
  val === null ||
  val === '' ||
  val === undefined ||
  (isArray(val) && (val as any[]).length === 0);
