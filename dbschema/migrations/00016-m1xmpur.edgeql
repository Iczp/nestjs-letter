CREATE MIGRATION m1xmpurscu2lh5y2ozr2hh6gkzdtxcnhyktdpk5escis7jlistyq7a
    ONTO m1b7py3nzf6zpucw2o24lq6vybnqjbagrfxbkq64meqi6n3oif7e3a
{
  ALTER TYPE default::User {
      CREATE PROPERTY erp_user_id: std::str {
          CREATE ANNOTATION std::title := 'Erp用户ID';
      };
  };
};
