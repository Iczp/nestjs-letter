CREATE MIGRATION m1t3bkm62ghv3v3wlyrlmupu2hdzpkfn34uvwvjcveehgm35i7n2eq
    ONTO m1h3lxcunne7tznq5bbumjqvzdoq5g5amemghtj7wbphiu5uo3nnna
{
  ALTER TYPE default::InviterConfig {
      DROP LINK invited_customers;
  };
};
