CREATE MIGRATION m1voby5zq66jlu2gy7b5tiedv3gq3e6izdgswcc757alx3eo2imy5a
    ONTO m1j6iok22wayx4geeg3mrszwrbn2xarvdeppbt6rnzqh32urt4cpya
{
  DROP GLOBAL default::soft_deleted;
  CREATE GLOBAL default::tenant_id -> std::uuid;
};
