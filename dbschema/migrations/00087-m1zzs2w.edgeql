CREATE MIGRATION m1zzs2w5azzsb2jt2bggnwgkdi77cxylysokty5hqdv7xrtnbvkp6a
    ONTO m14qxrijm4mhgc2dwnecnt3bsrlhiuoww74iarlerwapyr45kyrtbq
{
  ALTER TYPE default::Activity {
      DROP LINK customers;
  };
  ALTER TYPE default::ActivityCustomer {
      ALTER LINK activity {
          DROP ANNOTATION std::title;
      };
      ALTER PROPERTY activity_title {
          USING (.inviterConfig.activity.title);
      };
      DROP LINK activity;
  };
};
