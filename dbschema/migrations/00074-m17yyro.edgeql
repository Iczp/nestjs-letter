CREATE MIGRATION m17yyroaenla2ymgwoqeuecfhzbl75pbmruh7gm6d7ato3hi7vg7bq
    ONTO m13dzhobjk3jfn6qs4pnlzsrklpij7v3aeweghfjxbzusbv5lqvj5q
{
  ALTER TYPE default::UserRole {
      CREATE PROPERTY role_name := (.role.name);
      CREATE PROPERTY user_name := (.user.name);
  };
};
