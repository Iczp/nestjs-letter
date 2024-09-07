CREATE MIGRATION m1potnuflz55s6el7smanvfulrsjaqbnrx7au7tvyzixtiit4pqiha
    ONTO m1ftewmgkiejeozig3ba3zv7ijn5uu37xyi545rdf7gl5auvrpgbvq
{
  ALTER TYPE audit::AuditLog {
      ALTER PROPERTY headers {
          SET TYPE std::json USING (<std::json>.headers);
      };
      ALTER PROPERTY params {
          SET TYPE std::json USING (<std::json>.params);
      };
      ALTER PROPERTY query {
          SET TYPE std::json USING (<std::json>.query);
      };
  };
};
