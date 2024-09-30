CREATE MIGRATION m1lualifn77nohp3dprxxb5xwhavin7qnn4jl5unvffqpktleygx2a
    ONTO m1afydeqendgbxvx35qal22wc3lsk4eljq4gnm5j6gre3xflyforvq
{
  ALTER TYPE default::InviterConfig {
      ALTER ANNOTATION std::title := '活动邀请人配置表';
      ALTER CONSTRAINT std::exclusive ON ((.inviter, .activity)) {
          SET errmessage := '活动邀请人配置已经存在';
      };
  };
};
