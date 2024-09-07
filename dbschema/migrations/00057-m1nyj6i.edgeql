CREATE MIGRATION m1nyj6ik65i5sjuoc36lso5jn2t7wzdh7in5chxs7osy22ijlhwmnq
    ONTO m1ca7khwnhp3fku3nvu7okrz7wcl4rzmyh7liqql67ahokohwtkbgq
{
  ALTER TYPE audit::AuditLog {
      CREATE PROPERTY data: std::json {
          CREATE ANNOTATION std::title := 'data';
      };
      CREATE PROPERTY error: std::json {
          CREATE ANNOTATION std::title := 'error';
      };
  };
};
