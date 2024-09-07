CREATE MIGRATION m1ftewmgkiejeozig3ba3zv7ijn5uu37xyi545rdf7gl5auvrpgbvq
    ONTO m1rarlpl6hchkdr4rnucg6nnboblhfqzzibjh4qridk65i5mel3raq
{
  CREATE MODULE audit IF NOT EXISTS;
  CREATE TYPE audit::AuditLog {
      CREATE ANNOTATION std::title := '审计日志';
      CREATE PROPERTY app_name: std::str {
          CREATE ANNOTATION std::title := '应用名称';
      };
      CREATE PROPERTY body: std::str {
          CREATE ANNOTATION std::title := 'body';
      };
      CREATE PROPERTY browser_info: std::str {
          CREATE ANNOTATION std::title := '浏览器信息';
      };
      CREATE PROPERTY client_id: std::str {
          CREATE ANNOTATION std::title := '客户端ID';
      };
      CREATE PROPERTY client_name: std::str {
          CREATE ANNOTATION std::title := '客户端名称';
      };
      CREATE PROPERTY duration: std::int64 {
          CREATE ANNOTATION std::title := '执行时长';
      };
      CREATE PROPERTY excution_time: std::datetime {
          CREATE ANNOTATION std::title := '执行时间';
      };
      CREATE PROPERTY handler_name: std::str {
          CREATE ANNOTATION std::title := '服务名称';
      };
      CREATE PROPERTY headers: std::str {
          CREATE ANNOTATION std::title := 'headers';
      };
      CREATE PROPERTY http_method: std::str {
          CREATE ANNOTATION std::title := 'HTTP请求方式';
      };
      CREATE PROPERTY http_status: std::str {
          CREATE ANNOTATION std::title := 'HTTP状态码';
      };
      CREATE PROPERTY ip: std::str {
          CREATE ANNOTATION std::title := 'IP地址';
      };
      CREATE PROPERTY params: std::str {
          CREATE ANNOTATION std::title := 'params';
      };
      CREATE PROPERTY query: std::str {
          CREATE ANNOTATION std::title := 'query';
      };
      CREATE PROPERTY url: std::str {
          CREATE ANNOTATION std::title := 'URL';
      };
      CREATE PROPERTY user_id: std::str {
          CREATE ANNOTATION std::title := '用户Id';
      };
      CREATE PROPERTY user_name: std::str {
          CREATE ANNOTATION std::title := '用户Id';
      };
  };
};
