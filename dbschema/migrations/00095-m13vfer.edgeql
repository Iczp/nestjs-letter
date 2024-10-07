CREATE MIGRATION m13vfer2rvnqlw6v3ql6c2flj465eryyujvdu7ldq7p7wdu7bs2hca
    ONTO m1hfdzw3jctwfqguzqdhmtcdz5irbzpad5tvk2nqr6fh2o2ritimnq
{
  ALTER TYPE default::Activity {
      ALTER LINK inviter_customers {
          USING (SELECT
              .inviterConfigs.customers
          FILTER
              (.is_deleted = false)
          );
      };
      CREATE PROPERTY customers_count := (std::count((SELECT
          .inviter_customers
      FILTER
          (.is_deleted = false)
      )));
  };
};
