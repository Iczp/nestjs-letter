CREATE MIGRATION m1mdopjxv73ezxqvp556nne4a4erboelstirji7noyynlimiojzzfa
    ONTO m1njmkl6c3vnoapcc55rrul7dfpm3mhipgwelgvos5lpf6tlmhuyda
{
  CREATE TYPE default::Permission EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::title := '权限';
      CREATE PROPERTY code: std::str {
          CREATE ANNOTATION std::title := '编码';
      };
      CREATE PROPERTY name: std::str {
          CREATE ANNOTATION std::title := '权限名称';
      };
      CREATE PROPERTY sorting: std::int64 {
          CREATE ANNOTATION std::title := '编码';
      };
  };
  CREATE TYPE default::Role EXTENDING default::BaseEntity {
      CREATE MULTI LINK permissions: default::Permission {
          CREATE ANNOTATION std::title := '角色权限';
      };
      CREATE ANNOTATION std::title := '角色';
      CREATE PROPERTY code: std::str {
          CREATE ANNOTATION std::title := '编码';
      };
      CREATE PROPERTY name: std::str {
          CREATE ANNOTATION std::title := '权限名称';
      };
      CREATE PROPERTY sorting: std::int64 {
          CREATE ANNOTATION std::title := '编码';
      };
  };
};
