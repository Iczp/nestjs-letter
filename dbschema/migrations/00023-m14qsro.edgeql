CREATE MIGRATION m14qsrogfz4vb4f6o6i3dg2m6c6pcucd6ihcxb3oojh773ai2yomkq
    ONTO m1ffyrfjl37qm7mxueg36ruufbn2jb24t2tvcb6ep57r7il3rtrc4a
{
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY tenant USING (((GLOBAL default::tenant_id = .tenant_id) ?? false));
  };
};
