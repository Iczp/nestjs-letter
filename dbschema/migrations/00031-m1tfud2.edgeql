CREATE MIGRATION m1tfud22xts2tfms6ikg2cd4vsf7gvcqrfbzak355c4bvfev6vkusa
    ONTO m1hpvc6zyqc2asv7xlf5il3bgbbhs6xikvazh4s7l654u5mxhnw4qq
{
  ALTER TYPE default::Activity {
      DROP PROPERTY is_actived;
  };
};
