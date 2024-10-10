CREATE MIGRATION m1yucmg5d5h4damhhu7axt6l2uc2m3t7ernjpqmgxxbswxuetbho4a
    ONTO m1ckfjkocpbhxmmzwzpbwqgfqyffoprc2hfxw6htbxj3rmwbpl5obq
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY qrcode_template: std::json {
          CREATE ANNOTATION std::description := '变量 {id} 如： https://iczp.net/letter?id={id}';
          CREATE ANNOTATION std::title := '二维码模板';
      };
  };
};
