CREATE MIGRATION m1fbfzlsjlmqsvshok3szpgej5zocg7b4orcvyzhm4te4ijvrcbeca
    ONTO m1yvbljl6nn4nfvvc42w6rildz3h3l4n7zjzdzsy2agt6zozyeibeq
{
  ALTER TYPE default::ActivityCustomer {
      ALTER LINK activity {
          SET REQUIRED USING (<default::Activity>{});
      };
  };
};
