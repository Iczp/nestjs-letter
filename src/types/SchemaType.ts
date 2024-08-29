import { SchemaPropretyType } from './SchemaPropretyType';

export type SchemaType = SchemaPropretyType & {
  name: string;
  title?: string;
  properties: SchemaPropretyType[];
};
