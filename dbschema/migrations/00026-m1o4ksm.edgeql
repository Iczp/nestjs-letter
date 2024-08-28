CREATE MIGRATION m1o4ksmv7ekrifo7mpmdabiihonn7rxsy7m6iv5kj2twtayvdv5psa
    ONTO m1igbvzgshd4nro6jirswgqu7wxxiskvbltrnhig5gy2mfljjlt6ba
{
  ALTER TYPE default::BaseEntity {
      CREATE ACCESS POLICY soft_deletion
          ALLOW SELECT USING ((.is_deleted = false));
  };
};
