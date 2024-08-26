CREATE MIGRATION m1urqgytonulajzkaxuev5gblfa4wisxtzjjhx5cfkjhysizx2u6qq
    ONTO m1k5khtwx2bh2rl3tbhj5o7zub2drxenuttf2mn4jyc47rc2emgz2q
{
  ALTER TYPE default::Customer {
      ALTER PROPERTY gender {
          SET default := (default::Gender.Unknown);
      };
  };
  ALTER SCALAR TYPE default::Gender EXTENDING enum<Unknown, Male, Female>;
};
