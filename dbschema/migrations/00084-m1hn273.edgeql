CREATE MIGRATION m1hn273cm6ngp7lf43genhr5dshtb3imjkortjqfeokenyyltdxr6q
    ONTO m14j7cwayhyhyjslncqjcj7bjy6omeicktaq4hy53nxzwgvtaaczla
{
  ALTER TYPE default::Activity {
      CREATE LINK customers_list := (.inviterConfigs.customers);
  };
};
