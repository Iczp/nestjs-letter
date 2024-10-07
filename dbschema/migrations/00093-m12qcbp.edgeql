CREATE MIGRATION m12qcbpxgrdildlidmq2spjlnujfttslyqxvpzt6nrfokmqicduxpa
    ONTO m1ymad3du4rgvyuehxfrg625j7xp424zsgjljrneno7sjy3lvaucea
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
