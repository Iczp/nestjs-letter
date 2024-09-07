CREATE MIGRATION m12hiysnoxwj3zcm6fn45w2slv4e65w4sip7tupfaowtiwiqc4bfmq
    ONTO m1nyj6ik65i5sjuoc36lso5jn2t7wzdh7in5chxs7osy22ijlhwmnq
{
  ALTER TYPE audit::AuditLog {
      ALTER PROPERTY excution_time {
          SET default := (std::datetime_current());
      };
  };
};
