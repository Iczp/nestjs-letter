CREATE MIGRATION m1lz3kdvdcfpmuvz37lr4ocfu7ry7gb5b6nzez2wqvtkcabko3zeja
    ONTO m1b4zczeivmjc5bhhns5327nru3au7faugafks225n7zonidezsjkq
{
  ALTER TYPE default::InviterConfig {
      DROP CONSTRAINT std::exclusive ON ((.inviter, .max_count)) EXCEPT (.is_deleted);
  };
  ALTER TYPE default::InviterConfig {
      CREATE CONSTRAINT std::exclusive ON ((.inviter, .activity)) EXCEPT (.is_deleted) {
          SET errmessage := '活动邀请人配置已经存在';
      };
  };
};
