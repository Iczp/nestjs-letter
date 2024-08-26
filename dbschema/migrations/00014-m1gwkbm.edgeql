CREATE MIGRATION m1gwkbm75ueertnxnzalor3fewckqezojrpoh7tevsh6ooanmpjlbq
    ONTO m1fbfzlsjlmqsvshok3szpgej5zocg7b4orcvyzhm4te4ijvrcbeca
{
  ALTER TYPE default::Activity {
      ALTER LINK customers {
          DROP ANNOTATION std::title;
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
