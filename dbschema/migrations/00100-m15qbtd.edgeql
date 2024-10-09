CREATE MIGRATION m15qbtdza6etp6wvxcmqlhdcggevttjvcozl5xeicuh3givkmq63ka
    ONTO m1x2xn6zlrkdpggzvfprnl5yju347apoynlo3lvyf5o4thbd3tqtrq
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY image_last_modification_time: std::datetime {
          CREATE ANNOTATION std::title := '图片模板修改时间';
      };
  };
};
