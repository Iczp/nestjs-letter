CREATE MIGRATION m1ypnwrkhd4rhif2iydxfovsbbyyxoai2zbmwibatizclxigl2blva
    ONTO m147emgx6iw77ibfcm546t7qb2dlv5dld73zmnqaekq25jsxapzr5q
{
  ALTER TYPE default::ActivityCustomer {
      DROP PROPERTY customer_gender;
  };
};
