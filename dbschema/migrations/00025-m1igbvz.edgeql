CREATE MIGRATION m1igbvzgshd4nro6jirswgqu7wxxiskvbltrnhig5gy2mfljjlt6ba
    ONTO m15mfqzvg2fjirjpvzyeyhdl6z2tn5kgdkvwuzrt3yg5fukpemhvtq
{
  ALTER TYPE default::BaseEntity {
      DROP ACCESS POLICY soft_deletion;
      DROP ACCESS POLICY tenant;
  };
};
