CREATE MIGRATION m1nik2vbccnloy3uexay2u2rq4nepy7nwf3y7ehuizpuw2i3mi5jva
    ONTO m1s2zz7c34thxgnyjn44m7s5gh5tih4bxuccsykceupng3jtl365oq
{
  CREATE TYPE default::ActivityCustomer EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::title := '用户-活动的映射关系表';
      CREATE LINK activity: default::Activity {
          CREATE ANNOTATION std::title := '活动';
      };
      CREATE LINK customer: default::Customer {
          CREATE ANNOTATION std::title := '客户';
      };
  };
  ALTER TYPE default::Activity {
      ALTER LINK customers {
          SET TYPE default::ActivityCustomer USING (.customers[IS default::ActivityCustomer]);
      };
  };
  ALTER TYPE default::Customer {
      CREATE MULTI LINK activities: default::ActivityCustomer {
          CREATE ANNOTATION std::title := '用户参与的活动列表';
      };
  };
};
