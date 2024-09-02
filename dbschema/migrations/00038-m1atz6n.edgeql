CREATE MIGRATION m1atz6nhwbmon7qtt7mi6kc7kite4yn6vwbzha5fofz4ckkgb3zynq
    ONTO m1mdopjxv73ezxqvp556nne4a4erboelstirji7noyynlimiojzzfa
{
  ALTER TYPE default::User {
      CREATE LINK role: default::Role {
          CREATE ANNOTATION std::title := '用户角色';
      };
      CREATE MULTI LINK roles: default::Role {
          CREATE ANNOTATION std::title := '用户角色';
      };
  };
};
