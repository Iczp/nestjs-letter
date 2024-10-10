CREATE MIGRATION m1ckfjkocpbhxmmzwzpbwqgfqyffoprc2hfxw6htbxj3rmwbpl5obq
    ONTO m1tinsjmtextfvjbuwweplvdfvw2gg3r2jg3cs3lftkjrkaaahjb6a
{
  ALTER TYPE default::ActivityCustomer {
      CREATE LINK activity := (.inviterConfig.activity);
      ALTER PROPERTY activity_title {
          USING (.activity.title);
      };
  };
};
