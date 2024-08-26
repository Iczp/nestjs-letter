CREATE MIGRATION m1pyfrwn3edoxbp26ohz3x5kbpos6nxflw6x46giegq4kbpmxcn4rq
    ONTO m1eurammva3mtgdyuafncerx2llwytmqqoqlgy2jdscrqdlryimwxa
{
  CREATE TYPE default::Activity EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::description := '活动';
      CREATE ANNOTATION std::title := '活动';
      CREATE PROPERTY description: std::str {
          CREATE ANNOTATION std::title := '活动说明';
      };
      CREATE PROPERTY end_time: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '结束时间';
      };
      CREATE PROPERTY is_actived: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '是否活跃';
      };
      CREATE PROPERTY start_time: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '开始时间';
      };
      CREATE PROPERTY title: std::str {
          CREATE ANNOTATION std::title := '标题';
      };
  };
  ALTER TYPE default::BaseEntity {
      ALTER ANNOTATION std::description := 'All entities extending BaseEntity';
      ALTER ANNOTATION std::title := 'BaseEntity';
  };
  CREATE TYPE default::Customer EXTENDING default::BaseEntity {
      CREATE PROPERTY name: std::str {
          CREATE ANNOTATION std::title := '姓名';
      };
      CREATE PROPERTY phone: std::str {
          CREATE ANNOTATION std::title := '电话';
      };
  };
};
