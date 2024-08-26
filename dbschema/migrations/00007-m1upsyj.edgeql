CREATE MIGRATION m1upsyjelbrzpsxp35ll5ugfisgfwo364he5tvxijgz5yjpwbjhcda
    ONTO m1nik2vbccnloy3uexay2u2rq4nepy7nwf3y7ehuizpuw2i3mi5jva
{
  ALTER TYPE default::Customer {
      CREATE PROPERTY shopCode: std::str {
          CREATE ANNOTATION std::title := '门店编码';
      };
      CREATE PROPERTY shopName: std::str {
          CREATE ANNOTATION std::title := '门店名称';
      };
  };
};
