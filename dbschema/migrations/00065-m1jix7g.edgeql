CREATE MIGRATION m1jix7glyiv2g3dru6k4utvqrtwxdcipef24us26dbtswdzyt2awlq
    ONTO m1cprqzdenylyikr64rqrtltlz7joljdzcyss7tf57drez4xl3hbva
{
  CREATE TYPE default::InviterConfig EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::title := '用户-活动的映射关系表';
      CREATE REQUIRED LINK activity: default::Activity {
          CREATE ANNOTATION std::title := '活动';
      };
      CREATE REQUIRED LINK inviter: default::User {
          CREATE ANNOTATION std::title := '邀请人';
      };
      CREATE CONSTRAINT std::exclusive ON ((.inviter, .activity));
      CREATE PROPERTY max_count: std::int64 {
          CREATE ANNOTATION std::title := '可邀请人数';
      };
  };
};
