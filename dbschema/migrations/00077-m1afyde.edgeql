CREATE MIGRATION m1afydeqendgbxvx35qal22wc3lsk4eljq4gnm5j6gre3xflyforvq
    ONTO m1gskjwouiabowvmmmb3rz273d5yht556eftnp3qifmi7yxxufgtcq
{
  ALTER TYPE default::ActivityCustomer {
      CREATE PROPERTY activity_title := (.activity.title);
  };
};
