CREATE MIGRATION m1kkavwoogbi2zl5hag7mwrgtlyfxc7suc5xcsvyxnebcpurxaxeaa
    ONTO m1tu76s2vobr322c4socc5dei37fpd6i5nzyuiztzpmkkrjftctgdq
{
  ALTER TYPE default::Permission {
      CREATE PROPERTY tag: std::str {
          CREATE ANNOTATION std::title := '标签';
      };
  };
};
