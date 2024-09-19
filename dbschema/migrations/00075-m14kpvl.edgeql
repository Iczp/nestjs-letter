CREATE MIGRATION m14kpvlkggidplyh2y5xkkfghyfeeroenliv5jq4lqd4ggeuzql4vq
    ONTO m17yyroaenla2ymgwoqeuecfhzbl75pbmruh7gm6d7ato3hi7vg7bq
{
  ALTER TYPE default::RolePermission {
      CREATE PROPERTY permission_code := (.permission.code);
      CREATE PROPERTY permission_name := (.permission.name);
      CREATE PROPERTY role_code := (.role.code);
      CREATE PROPERTY role_name := (.role.name);
  };
};
