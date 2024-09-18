CREATE MIGRATION m1cprqzdenylyikr64rqrtltlz7joljdzcyss7tf57drez4xl3hbva
    ONTO m1swdgir5hfgqildah5ntv25dlkvntkqa7u3cn7hcsxuo232zcorpa
{
  ALTER TYPE default::UserRole {
      CREATE CONSTRAINT std::exclusive ON ((.user, .role));
  };
};
