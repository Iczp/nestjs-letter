CREATE MIGRATION m1oxoc7drnms4qczqa3sqplg6vhl36xp3bhsxpmpioucj3sb3jegbq
    ONTO m1lux3otdm36j23kw5u6s26lwr4f7fswm6yl5cdoteymyevssdj3ua
{
  ALTER TYPE default::ActivityCustomer {
      CREATE PROPERTY check_time: std::datetime {
          CREATE ANNOTATION std::title := '审核时间';
      };
      CREATE PROPERTY gift_time: std::datetime {
          CREATE ANNOTATION std::title := '礼品发放时间';
      };
      CREATE PROPERTY invite_time: std::datetime {
          CREATE ANNOTATION std::title := '邀请时间';
      };
      CREATE PROPERTY sign_time: std::datetime {
          CREATE ANNOTATION std::title := '签到时间';
      };
  };
};
