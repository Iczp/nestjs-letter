CREATE MIGRATION m1sh4kco24uky7on76yqi7yjo573frz6svr2ihsgzurfcathnxhxmq
    ONTO m1lz3kdvdcfpmuvz37lr4ocfu7ry7gb5b6nzez2wqvtkcabko3zeja
{
  ALTER TYPE default::InviterConfig {
      CREATE PROPERTY customers_count := (std::count((SELECT
          .customers
      FILTER
          (.is_deleted = false)
      )));
  };
};
