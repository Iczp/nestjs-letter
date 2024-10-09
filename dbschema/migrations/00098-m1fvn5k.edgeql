CREATE MIGRATION m1fvn5kg2idcsbzi5dja2tjstwt6uckjlfw77icfu2nimpxq7ekoaa
    ONTO m1aosk4wk74zvfkwv7pvj44kx6vivjnts3pluv42owvjaibitdys5a
{
  ALTER TYPE default::Activity {
      DROP PROPERTY bg_image;
      DROP PROPERTY is_image_set;
      DROP PROPERTY qrcode_rect;
  };
};
