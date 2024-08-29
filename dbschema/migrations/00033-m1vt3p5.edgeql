CREATE MIGRATION m1vt3p5pq6noi2we7ai4izlxfywmn2kg7knvcp2aoal26znxt5tila
    ONTO m12c6n4nlvufikfg2xvvaivd6zwbhezkr3h7cpugfbux7sa2nezx3q
{
  ALTER TYPE default::Activity {
      ALTER PROPERTY end_time {
          RESET default;
      };
  };
  ALTER TYPE default::ActivityCustomer {
      ALTER PROPERTY is_checked {
          ALTER ANNOTATION std::title := '是否审核';
      };
      CREATE PROPERTY is_gifted: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否发放礼品';
      };
      CREATE PROPERTY is_signed: std::bool {
          SET default := false;
          CREATE ANNOTATION std::title := '是否签到';
      };
      CREATE PROPERTY last_invite_time: std::datetime {
          CREATE ANNOTATION std::title := '最后邀请时间';
      };
  };
  CREATE TYPE default::GiftLog EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::title := '礼品发放日志';
      CREATE LINK owner: default::ActivityCustomer {
          CREATE ANNOTATION std::title := '领取者';
      };
      CREATE PROPERTY customer_name: std::str {
          CREATE ANNOTATION std::title := '客户名称';
      };
      CREATE PROPERTY remarks: std::str {
          CREATE ANNOTATION std::title := '备注';
      };
  };
  CREATE TYPE default::SignLog EXTENDING default::BaseEntity {
      CREATE ANNOTATION std::title := '签到日志';
      CREATE LINK owner: default::ActivityCustomer {
          CREATE ANNOTATION std::title := '签到者';
      };
      CREATE PROPERTY customer_name: std::str {
          CREATE ANNOTATION std::title := '客户名称';
      };
      CREATE PROPERTY remarks: std::str {
          CREATE ANNOTATION std::title := '备注';
      };
  };
};
