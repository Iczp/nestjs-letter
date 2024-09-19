CREATE MIGRATION m1mi4c2qs3vuec6eypyw6g4eo5tcik6epmzpn7zx7e5wdmwln2x2wq
    ONTO m1ujfwqxec4n3ofnwh6ydrhejn3o2hekhkgjjxyjsrlrmduglcruva
{
  ALTER TYPE default::ActivityCustomer {
      DROP LINK customer;
      DROP LINK inviter;
  };
};
