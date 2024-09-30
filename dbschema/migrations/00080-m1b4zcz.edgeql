CREATE MIGRATION m1b4zczeivmjc5bhhns5327nru3au7faugafks225n7zonidezsjkq
    ONTO m1ke26fvtyrrmz3thlwfr6ihfbczkyxpy3a5bd4nuctsfvfnwbhioq
{
  ALTER TYPE default::InviterConfig {
      CREATE CONSTRAINT std::exclusive ON ((.inviter, .max_count)) EXCEPT (.is_deleted) {
          SET errmessage := '活动邀请人配置已经存在';
      };
  };
  ALTER TYPE default::InviterConfig {
      DROP CONSTRAINT std::exclusive ON ((.inviter, .activity));
  };
};
