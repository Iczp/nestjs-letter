import { Injectable } from '@nestjs/common';
import e, { createClient } from 'dbschema/edgeql-js'; // auto-generated code
@Injectable()
export class PermissionsService {
  public client = createClient({
    // host: '10.0.5.20',
    // database: 'main',
    // port: 10707,
    // user: 'edgedb',
    // password: 'edgedb',
    // tlsSecurity: 'insecure',
    port: 10707,
    user: 'edgedb',
    password: 'edgedb',
    database: 'main',
    // tls_cert_data:
    //   '-----BEGIN CERTIFICATE-----\nMIIC0zCCAbugAwIBAgIRAMVyZO69vECfvvc40kpgQeEwDQYJKoZIhvcNAQELBQAw\nGDEWMBQGA1UEAwwNRWRnZURCIFNlcnZlcjAeFw0yNDA4MjMxNTU0MDBaFw00MzEw\nMjQxNTU0MDBaMBgxFjAUBgNVBAMMDUVkZ2VEQiBTZXJ2ZXIwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQCpwEfNmDSLxDCnaOGFtJFG7yvQ9Qfnpyal8Ts8\nmjCcRTVha1v/YW4M/ooypmn9t4s2WGAzK+BrBYAGGz4DEmvuupS3Jy/+lWEyOTaC\nLax/l6xbDNrVqjCt+3gZjy5qf4m7sTbt7d9j0bxz8vKy83F1fr5iyOqC7y0OWH1O\nWp5IaCItaYC3hfo4u86Je9HXY97yuFPPm7ywIg6ffnPgz37R61ExHpKzB5mQbaZ0\n9jet5VOUgeJRCUXujKvs94ZMudTC7gh0h7nhXrX5D/DEMOFG+GFAUUy0Qx/cOQyA\nzH7SBn7sgpcI1DNh70WG/DxqUIF9JxWRDiDwQ/5ISmkeUBorAgMBAAGjGDAWMBQG\nA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAGWWv7eG4teFo\nFIZfsYZW+FE0ql7acvueARQpLl1EQVUnvo1eaJVWJ4TotIBTGnaCatum9oZeMUSL\n1FqEQFdjIn3cU2/TeUbDgHSfnZp9Or6ZmOlp9P9X4MRooJYQjIPmxNdmuIJi7LOR\nnl/e+sUeEZ6pUFdVUFwqU1SM5p28EfZyQyakO7EFp/CvivxpMmUrqfNJrlt+Jk5Y\nZ8Xz1aTxdavVuEd9fv7ZAAXdfqQgqYqzy+Mjoi72DMqMHykwDjMQBjEi7b1sr+e8\n7ZC262jNb1XpA8zOeGDGqdOAIX22H8Ezx7vrVeh8ON+2enT8+ua67qBO8iK0Xrhk\ntHC7gMHIWA==\n-----END CERTIFICATE-----\n',
    // tls_ca:
    //   '-----BEGIN CERTIFICATE-----\nMIIC0zCCAbugAwIBAgIRAMVyZO69vECfvvc40kpgQeEwDQYJKoZIhvcNAQELBQAw\nGDEWMBQGA1UEAwwNRWRnZURCIFNlcnZlcjAeFw0yNDA4MjMxNTU0MDBaFw00MzEw\nMjQxNTU0MDBaMBgxFjAUBgNVBAMMDUVkZ2VEQiBTZXJ2ZXIwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQCpwEfNmDSLxDCnaOGFtJFG7yvQ9Qfnpyal8Ts8\nmjCcRTVha1v/YW4M/ooypmn9t4s2WGAzK+BrBYAGGz4DEmvuupS3Jy/+lWEyOTaC\nLax/l6xbDNrVqjCt+3gZjy5qf4m7sTbt7d9j0bxz8vKy83F1fr5iyOqC7y0OWH1O\nWp5IaCItaYC3hfo4u86Je9HXY97yuFPPm7ywIg6ffnPgz37R61ExHpKzB5mQbaZ0\n9jet5VOUgeJRCUXujKvs94ZMudTC7gh0h7nhXrX5D/DEMOFG+GFAUUy0Qx/cOQyA\nzH7SBn7sgpcI1DNh70WG/DxqUIF9JxWRDiDwQ/5ISmkeUBorAgMBAAGjGDAWMBQG\nA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAGWWv7eG4teFo\nFIZfsYZW+FE0ql7acvueARQpLl1EQVUnvo1eaJVWJ4TotIBTGnaCatum9oZeMUSL\n1FqEQFdjIn3cU2/TeUbDgHSfnZp9Or6ZmOlp9P9X4MRooJYQjIPmxNdmuIJi7LOR\nnl/e+sUeEZ6pUFdVUFwqU1SM5p28EfZyQyakO7EFp/CvivxpMmUrqfNJrlt+Jk5Y\nZ8Xz1aTxdavVuEd9fv7ZAAXdfqQgqYqzy+Mjoi72DMqMHykwDjMQBjEi7b1sr+e8\n7ZC262jNb1XpA8zOeGDGqdOAIX22H8Ezx7vrVeh8ON+2enT8+ua67qBO8iK0Xrhk\ntHC7gMHIWA==\n-----END CERTIFICATE-----\n',
    tlsSecurity: 'insecure',
  });
  async seed() {
    // await this.seederService.seed();

    console.log('PermissionsService seed');

    const query = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e
          .insert(e.Permission, {
            name: e.cast(e.str, item.name),
            code: e.cast(e.str, item.code),
          })
          .unlessConflict((entity) => ({
            on: entity.code,
            // else: e.update(e.Permission, () => ({
            //   filter_single: { code: e.cast(e.str, item.code) },
            //   set: {
            //     // name: e.op(e.cast(e.str, item.name), '++', 'dd'),
            //     last_modification_time: e.datetime_current(),
            //   },
            // })),
          }));
      });
    });

    const items = [
      { tag: '', name: 'admin', code: 'admin' },
      { tag: '', name: 'user', code: 'user' },
      { tag: '', name: 'zhongpei', code: 'zhongpei' },
      { tag: '', name: 'czp', code: 'czp' },
      { tag: '', name: '536d97c0602e', code: '536d97c0602e' },
    ];

    const result = await query.run(this.client, {
      items,
    });
    console.log(result);
  }
}
