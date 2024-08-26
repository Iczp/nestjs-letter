CREATE MIGRATION m1eurammva3mtgdyuafncerx2llwytmqqoqlgy2jdscrqdlryimwxa
    ONTO m1ircji5cff3oqtut4sp3f27pbcjftzr2b6peyjhmyqcx5bspermoq
{
  DROP TYPE default::Base;
  CREATE ABSTRACT TYPE default::BaseEntity {
      CREATE ANNOTATION std::description := 'All entity extends Base';
      CREATE ANNOTATION std::title := 'Base';
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
          CREATE ANNOTATION std::title := '是否已删除';
      };
      CREATE PROPERTY last_modification_time: std::datetime {
          SET default := (std::datetime_current());
          CREATE ANNOTATION std::title := '最后修改时间';
      };
  };
};
