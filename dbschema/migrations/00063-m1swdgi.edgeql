CREATE MIGRATION m1swdgir5hfgqildah5ntv25dlkvntkqa7u3cn7hcsxuo232zcorpa
    ONTO m16ya27ifnjavygfwm22ebtw5m3a2zkozupgchwlitordebp5qorrq
{
  ALTER TYPE default::User {
      CREATE CONSTRAINT std::exclusive ON ((.account, .erp_user_id));
  };
  ALTER TYPE logs::AuditLog {
      ALTER PROPERTY user_name {
          ALTER ANNOTATION std::title := '用户名称';
      };
  };
};
