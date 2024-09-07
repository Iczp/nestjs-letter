CREATE MIGRATION m12jxdjdhdl3d72c5hy3nbypekaj55dqzc74xdy462tjilowpgzv3a
    ONTO m12hiysnoxwj3zcm6fn45w2slv4e65w4sip7tupfaowtiwiqc4bfmq
{
  ALTER TYPE audit::AuditLog {
      ALTER PROPERTY body {
          RENAME TO host;
      };
  };
  ALTER TYPE audit::AuditLog {
      ALTER PROPERTY data {
          ALTER ANNOTATION std::title := 'Data';
      };
      ALTER PROPERTY error {
          ALTER ANNOTATION std::title := 'Error';
      };
      ALTER PROPERTY headers {
          ALTER ANNOTATION std::title := 'Headers';
      };
      ALTER PROPERTY host {
          ALTER ANNOTATION std::title := 'HOST';
      };
      DROP PROPERTY params;
      DROP PROPERTY query;
  };
};
