CREATE MIGRATION m1kxjgj5bqgvlxe67m2speye6dtd4odedmo2d33vqvqcr2atchpf6a
    ONTO m1rhki4zoztfmgrjlezr256sarjjrqpvdc3trbuanftrtmphobzgdq
{
  ALTER TYPE default::BaseEntity {
      ALTER PROPERTY is_deleted {
          SET REQUIRED USING (<std::bool>{false});
      };
      CREATE ACCESS POLICY soft_deletion
          ALLOW SELECT USING (.is_deleted);
  };
};
