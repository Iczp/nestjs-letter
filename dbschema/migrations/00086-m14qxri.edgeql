CREATE MIGRATION m14qxrijm4mhgc2dwnecnt3bsrlhiuoww74iarlerwapyr45kyrtbq
    ONTO m17o6janwt2vhd3horpoqc4orc6h2fq2wgl2vplvrx676f2qz2f7mq
{
  ALTER TYPE default::Activity {
      CREATE MULTI LINK customers := (.<activity[IS default::ActivityCustomer]);
  };
};
