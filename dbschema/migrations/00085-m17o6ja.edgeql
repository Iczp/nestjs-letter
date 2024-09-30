CREATE MIGRATION m17o6janwt2vhd3horpoqc4orc6h2fq2wgl2vplvrx676f2qz2f7mq
    ONTO m1hn273cm6ngp7lf43genhr5dshtb3imjkortjqfeokenyyltdxr6q
{
  ALTER TYPE default::Activity {
      DROP LINK customers;
  };
};
