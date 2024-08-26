CREATE MIGRATION m1yvbljl6nn4nfvvc42w6rildz3h3l4n7zjzdzsy2agt6zozyeibeq
    ONTO m1trkb2rsg5uej4zd56czsaddf2kgl6yemsselvxvrm3cynmlu7mna
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY address: std::str {
          CREATE ANNOTATION std::title := '活动地址';
      };
      CREATE PROPERTY content: std::str {
          CREATE ANNOTATION std::title := '活动说明';
      };
      ALTER PROPERTY description {
          ALTER ANNOTATION std::title := '活动简介';
      };
  };
  ALTER TYPE default::BaseEntity {
      CREATE PROPERTY is_enabled: std::bool {
          SET default := true;
          CREATE ANNOTATION std::title := '是否启用';
      };
  };
  ALTER TYPE default::Activity {
      CREATE PROPERTY max_count: std::int64 {
          CREATE ANNOTATION std::title := '参与人数量';
      };
  };
  ALTER TYPE default::Inviter {
      DROP PROPERTY positionName;
  };
  ALTER TYPE default::Inviter RENAME TO default::User;
  CREATE SCALAR TYPE default::UserType EXTENDING enum<Unset, Employee, Customer, ShopManager>;
  ALTER TYPE default::User {
      CREATE PROPERTY user_type: default::UserType {
          SET default := (default::UserType.Unset);
          CREATE ANNOTATION std::title := '用户类型';
      };
      ALTER ANNOTATION std::title := '用户表';
  };
  CREATE TYPE default::ShopManager EXTENDING default::User {
      CREATE ANNOTATION std::title := '邀请人表';
      CREATE PROPERTY positionName: std::str {
          CREATE ANNOTATION std::title := '职位名称';
      };
      ALTER PROPERTY user_type {
          SET default := (default::UserType.ShopManager);
          SET OWNED;
          SET TYPE default::UserType;
          CREATE ANNOTATION std::title := '用户类型';
      };
  };
  ALTER TYPE default::ActivityCustomer {
      ALTER LINK inviter {
          SET TYPE default::ShopManager USING (.inviter[IS default::ShopManager]);
      };
      CREATE PROPERTY customer_gender: std::str {
          CREATE ANNOTATION std::title := '客户性别';
      };
      CREATE PROPERTY customer_name: std::str {
          CREATE ANNOTATION std::title := '客户名称';
      };
      CREATE PROPERTY customer_phone: std::str {
          CREATE ANNOTATION std::title := '客户电话';
      };
      CREATE PROPERTY inviter_name: std::str {
          CREATE ANNOTATION std::title := '邀请人名称';
      };
      CREATE PROPERTY is_checked: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否签到';
      };
      CREATE PROPERTY is_invited: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否邀请';
      };
      CREATE PROPERTY remarks: std::str {
          CREATE ANNOTATION std::title := '备注';
      };
  };
  ALTER TYPE default::Customer {
      DROP EXTENDING default::BaseEntity;
      EXTENDING default::User LAST;
      ALTER PROPERTY gender {
          DROP ANNOTATION std::title;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY name {
          DROP ANNOTATION std::title;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY phone {
          DROP ANNOTATION std::title;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY user_type {
          SET default := (default::UserType.Customer);
          SET OWNED;
          SET TYPE default::UserType;
          CREATE ANNOTATION std::title := '用户类型';
      };
  };
};
