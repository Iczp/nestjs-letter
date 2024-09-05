CREATE MIGRATION m1claop53vtxtfq2brt5n2ndon4ajhlkm22x32vahsdiq2ofogw3wa
    ONTO m1hdhos3r3yse2zcfzz7xubw7jx7leyu53iqsx336ia7anc7vb5l6a
{
  ALTER TYPE default::RolePermission {
      CREATE CONSTRAINT std::exclusive ON ((.permission, .role));
  };
};
