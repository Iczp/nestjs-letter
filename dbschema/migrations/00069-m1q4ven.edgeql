CREATE MIGRATION m1q4venj3ed56yzacguznf272jgrbkgqt5bjitjsca774woo5r6qdq
    ONTO m1t3bkm62ghv3v3wlyrlmupu2hdzpkfn34uvwvjcveehgm35i7n2eq
{
  ALTER TYPE default::InviterConfig {
      CREATE MULTI LINK invited_customers := (.<inviterConfig[IS default::ActivityCustomer]);
  };
};
