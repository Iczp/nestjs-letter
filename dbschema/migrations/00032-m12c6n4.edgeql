CREATE MIGRATION m12c6n4nlvufikfg2xvvaivd6zwbhezkr3h7cpugfbux7sa2nezx3q
    ONTO m1tfud22xts2tfms6ikg2cd4vsf7gvcqrfbzak355c4bvfev6vkusa
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY is_actived: std::bool {
          SET default := true;
          CREATE ANNOTATION std::title := '是否活跃';
      };
  };
};
