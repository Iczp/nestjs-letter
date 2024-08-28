import { InsertShape } from 'dbschema/edgeql-js/insert';

export type ExtractDBType<T extends Record<any, any>> = InsertShape<
  T['__element__']
>;
