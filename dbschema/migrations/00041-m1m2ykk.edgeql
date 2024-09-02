CREATE MIGRATION m1m2ykkhl3vcbsypwvvmdhvak7kfcnmzf22f4hdqwdwwlxxkhzf6nq
    ONTO m1facq7stmcu7hbitdyhupbevutblaf6kyw2fw6b5mxxf667iaesta
{
  CREATE TYPE default::UserRole EXTENDING default::BaseEntity {
      CREATE REQUIRED LINK role: default::Role;
      CREATE REQUIRED LINK user: default::User;
      CREATE ANNOTATION std::title := '用户角色';
  };
  ALTER TYPE default::Role {
      ALTER LINK users {
          USING (.<role[IS default::UserRole]);
      };
  };
  ALTER TYPE default::User {
      ALTER LINK role {
          DROP ANNOTATION std::title;
      };
  };
  ALTER TYPE default::User {
      DROP LINK role;
      ALTER LINK roles {
          USING (.<user[IS default::UserRole]);
          DROP ANNOTATION std::title;
      };
  };
};
