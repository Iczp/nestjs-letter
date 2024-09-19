CREATE MIGRATION m1gskjwouiabowvmmmb3rz273d5yht556eftnp3qifmi7yxxufgtcq
    ONTO m14kpvlkggidplyh2y5xkkfghyfeeroenliv5jq4lqd4ggeuzql4vq
{
  ALTER TYPE default::ActivityCustomer {
      CREATE PROPERTY inviterConfig_Name := (.inviterConfig.inviter.name);
  };
};
