CREATE MIGRATION m1knm337ljjkh4dwoxth67basbvfmtu5g3iad2ynrvz6ixrjcix5ca
    ONTO m15qbtdza6etp6wvxcmqlhdcggevttjvcozl5xeicuh3givkmq63ka
{
  ALTER TYPE default::Activity {
      ALTER PROPERTY is_image_seted {
          SET default := false;
      };
  };
};
