CREATE MIGRATION m1aosk4wk74zvfkwv7pvj44kx6vivjnts3pluv42owvjaibitdys5a
    ONTO m1jte67eygb2wsahci3o6eqzwmkbhnjftokfz3i2c5z3silszmr6rq
{
  ALTER TYPE default::Activity {
      ALTER PROPERTY is_image_seted {
          ALTER ANNOTATION std::title := '是否设置了图片模板';
      };
  };
};
