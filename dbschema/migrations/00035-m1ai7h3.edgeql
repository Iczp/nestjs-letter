CREATE MIGRATION m1ai7h3oscp6n37oft677qxlxujdzl4ut7vhg564rjiuv2uvnqwu2q
    ONTO m1cx2svh2ue7ayfozjvxugv4yitucnrgf34mmvpnzl7qdwpenzh6nq
{
  ALTER TYPE default::ActivityCustomer {
      ALTER LINK customer {
          SET TYPE default::User;
      };
      ALTER LINK inviter {
          SET TYPE default::User;
      };
  };
};
