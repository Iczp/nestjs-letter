CREATE MIGRATION m1tu76s2vobr322c4socc5dei37fpd6i5nzyuiztzpmkkrjftctgdq
    ONTO m1m2ykkhl3vcbsypwvvmdhvak7kfcnmzf22f4hdqwdwwlxxkhzf6nq
{
  CREATE TYPE default::RolePermission EXTENDING default::BaseEntity {
      CREATE REQUIRED LINK permission: default::Permission;
      CREATE REQUIRED LINK role: default::Role;
      CREATE ANNOTATION std::title := '角色权限';
  };
  ALTER TYPE default::Permission {
      CREATE MULTI LINK roles := (.<permission[IS default::RolePermission]);
  };
  ALTER TYPE default::Role {
      ALTER LINK permissions {
          USING (.<role[IS default::RolePermission]);
          DROP ANNOTATION std::title;
      };
  };
};
