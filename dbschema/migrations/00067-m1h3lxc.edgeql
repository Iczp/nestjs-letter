CREATE MIGRATION m1h3lxcunne7tznq5bbumjqvzdoq5g5amemghtj7wbphiu5uo3nnna
    ONTO m16dn25i5lyftx5v5pwuzpkktysmkxfs4zcgvs4f7h2g435zjayomq
{
  ALTER TYPE default::ActivityCustomer {
      CREATE LINK inviterConfig: default::InviterConfig {
          CREATE ANNOTATION std::title := '邀请人';
      };
  };
  ALTER TYPE default::InviterConfig {
      CREATE MULTI LINK invited_customers := (.<inviterConfig[IS default::ActivityCustomer]);
  };
};
