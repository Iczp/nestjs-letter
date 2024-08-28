CREATE MIGRATION m15mfqzvg2fjirjpvzyeyhdl6z2tn5kgdkvwuzrt3yg5fukpemhvtq
    ONTO m14qsrogfz4vb4f6o6i3dg2m6c6pcucd6ihcxb3oojh773ai2yomkq
{
  ALTER TYPE default::BaseEntity {
      ALTER PROPERTY deletion_time {
          RESET default;
      };
      ALTER PROPERTY last_modification_time {
          RESET default;
      };
  };
};
