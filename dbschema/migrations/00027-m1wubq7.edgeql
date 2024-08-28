CREATE MIGRATION m1wubq7rhhi52bslcjvpj7mvnw5n7uxjfylyfotmdeo6rq4jl2h5va
    ONTO m1o4ksmv7ekrifo7mpmdabiihonn7rxsy7m6iv5kj2twtayvdv5psa
{
  ALTER TYPE default::BaseEntity {
      ALTER ACCESS POLICY soft_deletion ALLOW ALL;
  };
};
