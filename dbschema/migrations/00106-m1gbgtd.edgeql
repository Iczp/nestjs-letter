CREATE MIGRATION m1gbgtdyrcmupgqk45qdnb6aoeamcij4uispuypg5ijesi47ajcxda
    ONTO m1w2u34cah2d2iwhi37hh7nzctujlrvjdwlvk6ekkrjh7obxc6acca
{
  ALTER TYPE default::Activity {
      ALTER PROPERTY qrcode_template {
          SET TYPE std::str USING (<std::str>.qrcode_template);
      };
  };
};
