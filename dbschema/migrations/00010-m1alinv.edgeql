CREATE MIGRATION m1alinvujjm22us7iapemgcunrb5a2jak5c5h7wqdn7w4hlvb4irvq
    ONTO m1urqgytonulajzkaxuev5gblfa4wisxtzjjhx5cfkjhysizx2u6qq
{
  ALTER TYPE default::Customer {
      CREATE ANNOTATION std::title := '客户表';
  };
  CREATE TYPE default::Inviter EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::title := '邀请人表';
      CREATE PROPERTY gender: default::Gender {
          SET default := (default::Gender.Unknown);
          CREATE ANNOTATION std::title := '性别';
      };
      CREATE PROPERTY name: std::str {
          CREATE ANNOTATION std::title := '姓名';
      };
      CREATE PROPERTY phone: std::str {
          CREATE ANNOTATION std::title := '电话';
      };
      CREATE PROPERTY positionName: std::str {
          CREATE ANNOTATION std::title := '职位名称';
      };
  };
};
