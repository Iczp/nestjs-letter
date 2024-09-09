CREATE MIGRATION m1npnrry6k2ibejo32fzjno62g73oz3xrp3247iaxok7x2breawkoq
    ONTO m1rc424tven7d2swdcyfyorc4dent5gmjzzgzbr2uodxln7v6u5sta
{
  ALTER TYPE logs::AuditLog {
      CREATE PROPERTY accept_encoding: std::str {
          CREATE ANNOTATION std::title := 'Accept Encoding';
      };
      CREATE PROPERTY accept_language: std::str {
          CREATE ANNOTATION std::title := 'Accept Language';
      };
      CREATE PROPERTY referer: std::str {
          CREATE ANNOTATION std::title := 'Referer';
      };
  };
};
