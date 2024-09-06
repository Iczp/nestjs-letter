CREATE MIGRATION m1rarlpl6hchkdr4rnucg6nnboblhfqzzibjh4qridk65i5mel3raq
    ONTO m14hsy75diy4i7faqefnzftv3j3knjvbizow5ikvp2jrmefrylmnga
{
  ALTER TYPE default::Role {
      ALTER PROPERTY sorting {
          ALTER ANNOTATION std::title := '排序';
      };
  };
};
