CREATE MIGRATION m1k5khtwx2bh2rl3tbhj5o7zub2drxenuttf2mn4jyc47rc2emgz2q
    ONTO m1upsyjelbrzpsxp35ll5ugfisgfwo364he5tvxijgz5yjpwbjhcda
{
  CREATE SCALAR TYPE default::Gender EXTENDING enum<Male, Female, Unknown>;
  ALTER TYPE default::Customer {
      CREATE PROPERTY gender: default::Gender {
          CREATE ANNOTATION std::title := '性别';
      };
  };
};
