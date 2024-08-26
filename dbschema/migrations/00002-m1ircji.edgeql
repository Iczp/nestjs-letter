CREATE MIGRATION m1ircji5cff3oqtut4sp3f27pbcjftzr2b6peyjhmyqcx5bspermoq
    ONTO m13auwrzklanaxm2alukxapfeyq7pla3wdzi6uu645noyqewx5wedq
{
  ALTER TYPE default::Base {
      ALTER PROPERTY is_deleted {
          ALTER ANNOTATION std::title := '是否已删除';
      };
  };
};
