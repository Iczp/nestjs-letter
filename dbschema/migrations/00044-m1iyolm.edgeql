CREATE MIGRATION m1iyolmoi6e3xepu266g4b5ucvx7oqvs7irtehqmiuuyfvc66amxqa
    ONTO m1kkavwoogbi2zl5hag7mwrgtlyfxc7suc5xcsvyxnebcpurxaxeaa
{
  ALTER TYPE default::Permission {
      ALTER PROPERTY code {
          CREATE CONSTRAINT std::exclusive;
          SET REQUIRED USING (<std::str>{});
      };
  };
};
