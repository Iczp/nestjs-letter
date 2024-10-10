CREATE MIGRATION m1w2u34cah2d2iwhi37hh7nzctujlrvjdwlvk6ekkrjh7obxc6acca
    ONTO m1yucmg5d5h4damhhu7axt6l2uc2m3t7ernjpqmgxxbswxuetbho4a
{
  ALTER TYPE default::Activity {
      ALTER PROPERTY qrcode_template {
          ALTER ANNOTATION std::description := '变量 {{id}} 如： https://iczp.net/letter?id={{id}}';
      };
  };
};
