CREATE MIGRATION m16ya27ifnjavygfwm22ebtw5m3a2zkozupgchwlitordebp5qorrq
    ONTO m1npnrry6k2ibejo32fzjno62g73oz3xrp3247iaxok7x2breawkoq
{
  ALTER TYPE logs::AuditLog {
      CREATE PROPERTY class_name: std::str {
          CREATE ANNOTATION std::title := '服务名称';
      };
      ALTER PROPERTY handler_name {
          ALTER ANNOTATION std::title := '方法名称';
      };
  };
};
