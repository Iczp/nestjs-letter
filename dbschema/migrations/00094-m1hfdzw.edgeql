CREATE MIGRATION m1hfdzw3jctwfqguzqdhmtcdz5irbzpad5tvk2nqr6fh2o2ritimnq
    ONTO m12qcbpxgrdildlidmq2spjlnujfttslyqxvpzt6nrfokmqicduxpa
{
  ALTER TYPE default::ActivityCustomer {
      DROP PROPERTY inviter_name;
  };
};
