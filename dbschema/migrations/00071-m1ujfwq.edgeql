CREATE MIGRATION m1ujfwqxec4n3ofnwh6ydrhejn3o2hekhkgjjxyjsrlrmduglcruva
    ONTO m16a7mmylegsdajgg27lryumbn6vea3lot6lehl2dhaork4kjhch6q
{
  ALTER TYPE default::InviterConfig {
      ALTER LINK invited_customers {
          RENAME TO customers;
      };
  };
};
