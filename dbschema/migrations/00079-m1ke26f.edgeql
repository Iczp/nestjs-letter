CREATE MIGRATION m1ke26fvtyrrmz3thlwfr6ihfbczkyxpy3a5bd4nuctsfvfnwbhioq
    ONTO m1lualifn77nohp3dprxxb5xwhavin7qnn4jl5unvffqpktleygx2a
{
  ALTER TYPE default::InviterConfig {
      CREATE PROPERTY activity_title := (.activity.title);
  };
};
