CREATE MIGRATION m1carjgzvb3mtrp6hgm4r263s2ppddge6wnkdfv5aagnhjkn2i2l3q
    ONTO m1atz6nhwbmon7qtt7mi6kc7kite4yn6vwbzha5fofz4ckkgb3zynq
{
  ALTER TYPE default::Role {
      CREATE MULTI LINK users := (.<role[IS default::User]);
  };
};
