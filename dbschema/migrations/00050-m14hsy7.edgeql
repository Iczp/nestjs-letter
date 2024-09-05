CREATE MIGRATION m14hsy75diy4i7faqefnzftv3j3knjvbizow5ikvp2jrmefrylmnga
    ONTO m1claop53vtxtfq2brt5n2ndon4ajhlkm22x32vahsdiq2ofogw3wa
{
  ALTER TYPE default::Role {
      ALTER PROPERTY code {
          CREATE CONSTRAINT std::exclusive;
          SET REQUIRED USING (<std::str>{});
      };
  };
};
