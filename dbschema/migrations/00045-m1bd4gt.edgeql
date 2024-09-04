CREATE MIGRATION m1bd4gtuz3x2444cbth7dwso2h3ediaxhtizllaland7scve6ownfq
    ONTO m1iyolmoi6e3xepu266g4b5ucvx7oqvs7irtehqmiuuyfvc66amxqa
{
  ALTER TYPE default::Permission {
      CREATE MULTI LINK permissionRoles: default::Permission {
          CREATE ANNOTATION std::title := '权限角色';
      };
  };
  ALTER TYPE default::Role {
      CREATE MULTI LINK rolePermissions: default::Permission {
          CREATE ANNOTATION std::title := '角色权限';
      };
  };
};
