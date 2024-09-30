CREATE MIGRATION m147emgx6iw77ibfcm546t7qb2dlv5dld73zmnqaekq25jsxapzr5q
    ONTO m1zzs2w5azzsb2jt2bggnwgkdi77cxylysokty5hqdv7xrtnbvkp6a
{
  ALTER TYPE default::Activity {
      ALTER LINK customers_list {
          RENAME TO inviter_customers;
      };
  };
};
