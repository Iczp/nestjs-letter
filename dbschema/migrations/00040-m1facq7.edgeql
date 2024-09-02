CREATE MIGRATION m1facq7stmcu7hbitdyhupbevutblaf6kyw2fw6b5mxxf667iaesta
    ONTO m1carjgzvb3mtrp6hgm4r263s2ppddge6wnkdfv5aagnhjkn2i2l3q
{
  ALTER TYPE default::Role {
      CREATE PROPERTY is_default: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否默认';
      };
      CREATE PROPERTY is_public: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否公开';
      };
      CREATE PROPERTY is_static: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否固有';
      };
  };
};
