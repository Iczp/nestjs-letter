CREATE MIGRATION m13auwrzklanaxm2alukxapfeyq7pla3wdzi6uu645noyqewx5wedq
    ONTO initial
{
  CREATE ABSTRACT TYPE default::Base {
      CREATE PROPERTY creation_time: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '创建时间';
      };
      CREATE PROPERTY deletion_time: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '删除时间';
      };
      CREATE PROPERTY is_deleted: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '最后修改时间';
      };
      CREATE PROPERTY last_modification_time: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '最后修改时间';
      };
  };
};
