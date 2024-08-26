CREATE MIGRATION m1b7py3nzf6zpucw2o24lq6vybnqjbagrfxbkq64meqi6n3oif7e3a
    ONTO m1gwkbm75ueertnxnzalor3fewckqezojrpoh7tevsh6ooanmpjlbq
{
  ALTER TYPE default::Activity {
      ALTER LINK customers {
          USING (.<activity[IS default::ActivityCustomer]);
          DROP CONSTRAINT std::exclusive;
      };
  };
};
