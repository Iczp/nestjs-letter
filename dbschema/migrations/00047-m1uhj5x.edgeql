CREATE MIGRATION m1uhj5xazkqwrnujco6uy72bqp2ieft3uakgzj3qdiaej4xranph6q
    ONTO m1uo4lev35pdyjqcl7p6z5oqfpgm5izak4idgd77qkljg6tqmhitdq
{
  ALTER TYPE default::Permission {
      DROP LINK permissionRoles;
  };
  ALTER TYPE default::Role {
      DROP LINK rolePermissions;
  };
};
