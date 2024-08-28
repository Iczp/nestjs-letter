CREATE MIGRATION m1avuqh4g5x2eaf4mdzzjybim4uo4tpbvajeezdwwgqdsk7w7agbuq
    ONTO m1xmpurscu2lh5y2ozr2hh6gkzdtxcnhyktdpk5escis7jlistyq7a
{
  CREATE GLOBAL default::current_user_id -> std::uuid;
  CREATE GLOBAL default::current_user := (SELECT
      default::User
  FILTER
      (.id = GLOBAL default::current_user_id)
  );
  CREATE GLOBAL default::soft_deleted -> std::bool;
};
