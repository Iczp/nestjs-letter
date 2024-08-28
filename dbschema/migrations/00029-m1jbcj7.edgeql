CREATE MIGRATION m1jbcj7s37mhyb36u7dvdq7vv7nqazrphwhwesoy52ms6rp7yiwzsq
    ONTO m1tcoit2ycl7t4fjvg5cqwmqfy23endj7ii5lo3xhsibmh5jdbcpwa
{
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY allOp1 RENAME TO denySelect;
  };
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY allOp RENAME TO allowAll;
  };
};
