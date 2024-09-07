CREATE MIGRATION m17ngeq52tfedqodf57uw6suozka4ksfhphoe6asvk6oge7644kjja
    ONTO m1tf5nskxhzpnmo772s4s4d53lfeg7fx2tolaicrf7awknafxm4p3a
{
  ALTER TYPE audit::AuditLog {
      DROP PROPERTY duration;
  };
};
