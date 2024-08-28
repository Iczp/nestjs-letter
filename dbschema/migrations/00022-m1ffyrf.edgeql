CREATE MIGRATION m1ffyrfjl37qm7mxueg36ruufbn2jb24t2tvcb6ep57r7il3rtrc4a
    ONTO m1voby5zq66jlu2gy7b5tiedv3gq3e6izdgswcc757alx3eo2imy5a
{
  ALTER GLOBAL default::tenant_id SET TYPE std::str RESET TO DEFAULT;
  ALTER TYPE default::BaseEntity {
      CREATE REQUIRED PROPERTY tenant_id: std::str {
          SET default := 'default';
          CREATE ANNOTATION std::title := '租户';
      };
      CREATE ACCESS POLICY tenant
          ALLOW SELECT USING (((GLOBAL default::tenant_id = .tenant_id) ?? true));
  };
};
