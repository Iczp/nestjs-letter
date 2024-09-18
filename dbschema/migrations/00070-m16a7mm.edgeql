CREATE MIGRATION m16a7mmylegsdajgg27lryumbn6vea3lot6lehl2dhaork4kjhch6q
    ONTO m1q4venj3ed56yzacguznf272jgrbkgqt5bjitjsca774woo5r6qdq
{
  ALTER TYPE default::Activity {
      CREATE MULTI LINK inviterConfigs := (.<activity[IS default::InviterConfig]);
  };
};
