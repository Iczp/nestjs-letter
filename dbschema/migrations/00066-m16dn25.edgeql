CREATE MIGRATION m16dn25i5lyftx5v5pwuzpkktysmkxfs4zcgvs4f7h2g435zjayomq
    ONTO m1jix7glyiv2g3dru6k4utvqrtwxdcipef24us26dbtswdzyt2awlq
{
  ALTER TYPE default::BaseEntity {
      ALTER PROPERTY creation_time {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      ALTER PROPERTY last_modification_time {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
