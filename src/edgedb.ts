import createClient from 'edgedb';
import edb from 'dbschema/edgeql-js'; // auto-generated code

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

export const e = edb;
