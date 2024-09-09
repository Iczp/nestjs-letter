CREATE MIGRATION m1rc424tven7d2swdcyfyorc4dent5gmjzzgzbr2uodxln7v6u5sta
    ONTO m12jxdjdhdl3d72c5hy3nbypekaj55dqzc74xdy462tjilowpgzv3a
{
  CREATE MODULE logs IF NOT EXISTS;
  ALTER TYPE audit::AuditLog RENAME TO logs::AuditLog;
  DROP MODULE audit;
};
