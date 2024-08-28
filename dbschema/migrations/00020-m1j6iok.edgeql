CREATE MIGRATION m1j6iok22wayx4geeg3mrszwrbn2xarvdeppbt6rnzqh32urt4cpya
    ONTO m1kxjgj5bqgvlxe67m2speye6dtd4odedmo2d33vqvqcr2atchpf6a
{
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY soft_deletion USING ((.is_deleted = false));
  };
};
