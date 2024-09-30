CREATE MIGRATION m14j7cwayhyhyjslncqjcj7bjy6omeicktaq4hy53nxzwgvtaaczla
    ONTO m1sh4kco24uky7on76yqi7yjo573frz6svr2ihsgzurfcathnxhxmq
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY inviter_configs_count := (std::count((SELECT
          .inviterConfigs
      FILTER
          (.is_deleted = false)
      )));
  };
};
