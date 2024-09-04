CREATE MIGRATION m1uo4lev35pdyjqcl7p6z5oqfpgm5izak4idgd77qkljg6tqmhitdq
    ONTO m1bd4gtuz3x2444cbth7dwso2h3ediaxhtizllaland7scve6ownfq
{
  ALTER TYPE default::Permission {
      ALTER LINK permissionRoles {
          SET TYPE default::Role USING (.permissionRoles[IS default::Role]);
      };
  };
};
