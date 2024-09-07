CREATE MIGRATION m1tf5nskxhzpnmo772s4s4d53lfeg7fx2tolaicrf7awknafxm4p3a
    ONTO m1potnuflz55s6el7smanvfulrsjaqbnrx7au7tvyzixtiit4pqiha
{
  ALTER TYPE audit::AuditLog {
      ALTER PROPERTY duration {
          SET TYPE std::duration USING (<std::duration>std::to_duration(seconds := .duration));
      };
  };
};
