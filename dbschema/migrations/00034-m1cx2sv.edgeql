CREATE MIGRATION m1cx2svh2ue7ayfozjvxugv4yitucnrgf34mmvpnzl7qdwpenzh6nq
    ONTO m1vt3p5pq6noi2we7ai4izlxfywmn2kg7knvcp2aoal26znxt5tila
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY bg_image: std::str {
          CREATE ANNOTATION std::title := '活动图片';
      };
      CREATE PROPERTY is_image_set: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否设置了图片模板';
      };
      CREATE PROPERTY qrcode_rect: std::str {
          CREATE ANNOTATION std::title := '二维码图片位置';
      };
  };
};
