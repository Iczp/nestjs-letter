CREATE MIGRATION m1ymad3du4rgvyuehxfrg625j7xp424zsgjljrneno7sjy3lvaucea
    ONTO m1oxoc7drnms4qczqa3sqplg6vhl36xp3bhsxpmpioucj3sb3jegbq
{
  ALTER TYPE default::ActivityCustomer {
      DROP PROPERTY check_time;
      DROP PROPERTY gift_time;
      DROP PROPERTY invite_time;
      DROP PROPERTY sign_time;
  };
};
