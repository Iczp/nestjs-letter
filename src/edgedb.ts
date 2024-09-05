import createClient from 'edgedb';

// C:\Users\ZP\AppData\Local\EdgeDB\config\credentials
// edgedb --host=10.0.5.20 --port=10707 --database=main --user=edgedb --password
// Edgedb --host=127.0.0.1 --port=10707 --database=main --user=edgedb --tls-security=default --password query \
//  "CONFIGURE INSTANCE SET listen_addresses := {'0.0.0.0'};"

// edgedb --port 10707 --tls-security insecure --password query \
//  "CONFIGURE INSTANCE SET listen_addresses := {'0.0.0.0'};"
export const client = createClient({
  // host: '10.0.5.20',
  // database: 'main',
  // port: 10707,
  // user: 'edgedb',
  // password: 'edgedb',
  // tlsSecurity: 'insecure',
  //   port: 10708,
  //   user: 'edgedb',
  //   password: 'vpZbocFbvRXtSC2n4dMC4Zyq',
  //   database: 'main',
  //   // tls_cert_data:
  //   //   '-----BEGIN CERTIFICATE-----\nMIIC0zCCAbugAwIBAgIRAMVyZO69vECfvvc40kpgQeEwDQYJKoZIhvcNAQELBQAw\nGDEWMBQGA1UEAwwNRWRnZURCIFNlcnZlcjAeFw0yNDA4MjMxNTU0MDBaFw00MzEw\nMjQxNTU0MDBaMBgxFjAUBgNVBAMMDUVkZ2VEQiBTZXJ2ZXIwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQCpwEfNmDSLxDCnaOGFtJFG7yvQ9Qfnpyal8Ts8\nmjCcRTVha1v/YW4M/ooypmn9t4s2WGAzK+BrBYAGGz4DEmvuupS3Jy/+lWEyOTaC\nLax/l6xbDNrVqjCt+3gZjy5qf4m7sTbt7d9j0bxz8vKy83F1fr5iyOqC7y0OWH1O\nWp5IaCItaYC3hfo4u86Je9HXY97yuFPPm7ywIg6ffnPgz37R61ExHpKzB5mQbaZ0\n9jet5VOUgeJRCUXujKvs94ZMudTC7gh0h7nhXrX5D/DEMOFG+GFAUUy0Qx/cOQyA\nzH7SBn7sgpcI1DNh70WG/DxqUIF9JxWRDiDwQ/5ISmkeUBorAgMBAAGjGDAWMBQG\nA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAGWWv7eG4teFo\nFIZfsYZW+FE0ql7acvueARQpLl1EQVUnvo1eaJVWJ4TotIBTGnaCatum9oZeMUSL\n1FqEQFdjIn3cU2/TeUbDgHSfnZp9Or6ZmOlp9P9X4MRooJYQjIPmxNdmuIJi7LOR\nnl/e+sUeEZ6pUFdVUFwqU1SM5p28EfZyQyakO7EFp/CvivxpMmUrqfNJrlt+Jk5Y\nZ8Xz1aTxdavVuEd9fv7ZAAXdfqQgqYqzy+Mjoi72DMqMHykwDjMQBjEi7b1sr+e8\n7ZC262jNb1XpA8zOeGDGqdOAIX22H8Ezx7vrVeh8ON+2enT8+ua67qBO8iK0Xrhk\ntHC7gMHIWA==\n-----END CERTIFICATE-----\n',
  //   // tls_ca:
  //   //   '-----BEGIN CERTIFICATE-----\nMIIC0zCCAbugAwIBAgIRAMVyZO69vECfvvc40kpgQeEwDQYJKoZIhvcNAQELBQAw\nGDEWMBQGA1UEAwwNRWRnZURCIFNlcnZlcjAeFw0yNDA4MjMxNTU0MDBaFw00MzEw\nMjQxNTU0MDBaMBgxFjAUBgNVBAMMDUVkZ2VEQiBTZXJ2ZXIwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQCpwEfNmDSLxDCnaOGFtJFG7yvQ9Qfnpyal8Ts8\nmjCcRTVha1v/YW4M/ooypmn9t4s2WGAzK+BrBYAGGz4DEmvuupS3Jy/+lWEyOTaC\nLax/l6xbDNrVqjCt+3gZjy5qf4m7sTbt7d9j0bxz8vKy83F1fr5iyOqC7y0OWH1O\nWp5IaCItaYC3hfo4u86Je9HXY97yuFPPm7ywIg6ffnPgz37R61ExHpKzB5mQbaZ0\n9jet5VOUgeJRCUXujKvs94ZMudTC7gh0h7nhXrX5D/DEMOFG+GFAUUy0Qx/cOQyA\nzH7SBn7sgpcI1DNh70WG/DxqUIF9JxWRDiDwQ/5ISmkeUBorAgMBAAGjGDAWMBQG\nA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAGWWv7eG4teFo\nFIZfsYZW+FE0ql7acvueARQpLl1EQVUnvo1eaJVWJ4TotIBTGnaCatum9oZeMUSL\n1FqEQFdjIn3cU2/TeUbDgHSfnZp9Or6ZmOlp9P9X4MRooJYQjIPmxNdmuIJi7LOR\nnl/e+sUeEZ6pUFdVUFwqU1SM5p28EfZyQyakO7EFp/CvivxpMmUrqfNJrlt+Jk5Y\nZ8Xz1aTxdavVuEd9fv7ZAAXdfqQgqYqzy+Mjoi72DMqMHykwDjMQBjEi7b1sr+e8\n7ZC262jNb1XpA8zOeGDGqdOAIX22H8Ezx7vrVeh8ON+2enT8+ua67qBO8iK0Xrhk\ntHC7gMHIWA==\n-----END CERTIFICATE-----\n',
  //   tlsSecurity: 'insecure',
});
