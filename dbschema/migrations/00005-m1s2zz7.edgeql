CREATE MIGRATION m1s2zz7c34thxgnyjn44m7s5gh5tih4bxuccsykceupng3jtl365oq
    ONTO m1pyfrwn3edoxbp26ohz3x5kbpos6nxflw6x46giegq4kbpmxcn4rq
{
  ALTER TYPE default::Activity {
      CREATE MULTI LINK customers: default::Customer {
          CREATE ANNOTATION std::title := '本次活动的用户列表';
      };
      CREATE PROPERTY coverUrl: std::str {
          CREATE ANNOTATION std::title := '封面地址';
      };
  };
};
