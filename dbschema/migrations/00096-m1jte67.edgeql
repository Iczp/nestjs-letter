CREATE MIGRATION m1jte67eygb2wsahci3o6eqzwmkbhnjftokfz3i2c5z3silszmr6rq
    ONTO m13vfer2rvnqlw6v3ql6c2flj465eryyujvdu7ldq7p7wdu7bs2hca
{
  ALTER TYPE default::Activity {
      ALTER PROPERTY coverUrl {
          RENAME TO cover_url;
      };
  };
  ALTER TYPE default::Activity {
      CREATE PROPERTY image_base64: std::str {
          CREATE ANNOTATION std::title := '模板图片base64';
      };
      CREATE PROPERTY image_crop: std::json {
          CREATE ANNOTATION std::title := '模板二维码图片位置信息';
      };
      CREATE PROPERTY is_image_seted: std::bool {
          SET default := true;
          CREATE ANNOTATION std::title := '设置';
      };
  };
};
