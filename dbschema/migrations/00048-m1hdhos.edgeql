CREATE MIGRATION m1hdhos3r3yse2zcfzz7xubw7jx7leyu53iqsx336ia7anc7vb5l6a
    ONTO m1uhj5xazkqwrnujco6uy72bqp2ieft3uakgzj3qdiaej4xranph6q
{
  ALTER TYPE default::User {
      CREATE PROPERTY account: std::str {
          CREATE ANNOTATION std::title := '账号';
      };
      CREATE PROPERTY password: std::str {
          CREATE ANNOTATION std::title := '密码';
      };
  };
};
