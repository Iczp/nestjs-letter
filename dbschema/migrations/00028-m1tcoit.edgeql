CREATE MIGRATION m1tcoit2ycl7t4fjvg5cqwmqfy23endj7ii5lo3xhsibmh5jdbcpwa
    ONTO m1wubq7rhhi52bslcjvpj7mvnw5n7uxjfylyfotmdeo6rq4jl2h5va
{
  ALTER TYPE default::BaseEntity {
      CREATE ACCESS POLICY allOp1
          DENY SELECT USING ((.is_deleted = true));
  };
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY soft_deletion RENAME TO allOp;
  };
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY allOp USING (true);
  };
};
