import createClient from 'edgedb';
import _e_ from 'dbschema/edgeql-js'; // auto-generated code
import { SchemaType } from './types/SchemaType';
import { Logger } from '@nestjs/common';
import { Filters } from './common/Filters';

// C:\Users\ZP\AppData\Local\EdgeDB\config\credentials
// edgedb --host=10.0.5.20 --port=10707 --database=main --user=edgedb --password
// Edgedb --host=127.0.0.1 --port=10707 --database=main --user=edgedb --tls-security=default --password query \
//  "CONFIGURE INSTANCE SET listen_addresses := {'0.0.0.0'};"

// edgedb --port 10707 --tls-security insecure --password query \
//  "CONFIGURE INSTANCE SET listen_addresses := {'0.0.0.0'};"

export const client = createClient({
  port: 10708,
  user: 'edgedb',
  password: 'vpZbocFbvRXtSC2n4dMC4Zyq',
  database: 'main',
  tlsSecurity: 'insecure',
});

export const e = _e_;

export const getTitle = (annotations: any): string | null => {
  const arr = annotations ?? [];
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[0]['@value'];
  }
  return null;
};

export async function getFieldsFromEdgeDB(
  tableName?: string,
): Promise<SchemaType[]> {
  let query = `
WITH MODULE schema
SELECT ObjectType {
  name,
  properties:{
    name,
    default,
    target:{
      name
    },
    annotations: {
      @value
    },
  },
  annotations: {
    name,
    @value,
  },
}
#FILTER .name = <str>'default::User'
FILTER
  
`;

  let args: any;
  if (tableName) {
    query += `.name = <str>$tableName`;
    args = { tableName };
  } else {
    query += `
    .name like 'default::%' or
    .name like 'logs:%'
    `;
    args = undefined;
  }

  const result = await client.query(query, args);

  // console.log('result', result);

  return result.map((x: any) => ({
    name: x.name as string,
    title: getTitle(x.annotations),
    properties: x.properties.map((p) => ({
      name: p.name,
      default: p.default,
      title: getTitle(p.annotations),
    })),
  }));
}

export const getGranted = async (userId: string, policyNames: string[]) => {
  const query = e.select(e.RolePermission, (rp) => ({
    id: true,
    role: {
      name: true,
    },
    // permission: {
    //   id: true,
    //   name: true,
    //   code: true,
    // },
    // filter: e.op(rp.permission.code, 'in', e.set(...policyNames.map(e.str))),
    filter: new Filters([
      e.op(rp.role.users.user.id, '?=', e.uuid(userId)),
      e.op(rp.permission.code, 'in', e.set(...policyNames.map(e.str))),
    ]).and(),
  }));

  Logger.log(`query:${query.toEdgeQL()}`, 'EdgeDB');

  return await query.run(client);
};
