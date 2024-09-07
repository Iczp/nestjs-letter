CREATE MIGRATION m1ca7khwnhp3fku3nvu7okrz7wcl4rzmyh7liqql67ahokohwtkbgq
    ONTO m17ngeq52tfedqodf57uw6suozka4ksfhphoe6asvk6oge7644kjja
{
  ALTER TYPE audit::AuditLog {
      CREATE PROPERTY duration: std::int64 {
          CREATE ANNOTATION std::title := '执行时长';
      };
      ALTER PROPERTY http_status {
          SET TYPE std::int64 USING (<std::int64>.http_status);
      };
  };
};
