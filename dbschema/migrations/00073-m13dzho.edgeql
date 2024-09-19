CREATE MIGRATION m13dzhobjk3jfn6qs4pnlzsrklpij7v3aeweghfjxbzusbv5lqvj5q
    ONTO m1mi4c2qs3vuec6eypyw6g4eo5tcik6epmzpn7zx7e5wdmwln2x2wq
{
  ALTER TYPE default::InviterConfig {
      CREATE PROPERTY inviter_name := (.inviter.name);
  };
};
