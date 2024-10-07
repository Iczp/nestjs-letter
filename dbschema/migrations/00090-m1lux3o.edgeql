CREATE MIGRATION m1lux3otdm36j23kw5u6s26lwr4f7fswm6yl5cdoteymyevssdj3ua
    ONTO m1ypnwrkhd4rhif2iydxfovsbbyyxoai2zbmwibatizclxigl2blva
{
  ALTER TYPE default::ActivityCustomer {
      CREATE PROPERTY customer_gender: default::Gender {
          CREATE ANNOTATION std::title := '客户性别';
      };
  };
};
