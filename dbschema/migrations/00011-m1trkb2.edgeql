CREATE MIGRATION m1trkb2rsg5uej4zd56czsaddf2kgl6yemsselvxvrm3cynmlu7mna
    ONTO m1alinvujjm22us7iapemgcunrb5a2jak5c5h7wqdn7w4hlvb4irvq
{
  ALTER TYPE default::ActivityCustomer {
      CREATE LINK inviter: default::Inviter {
          CREATE ANNOTATION std::title := '邀请人';
      };
  };
};
