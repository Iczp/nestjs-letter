CREATE MIGRATION m1tinsjmtextfvjbuwweplvdfvw2gg3r2jg3cs3lftkjrkaaahjb6a
    ONTO m1knm337ljjkh4dwoxth67basbvfmtu5g3iad2ynrvz6ixrjcix5ca
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY image_mimetype: std::str {
          CREATE ANNOTATION std::title := '图片类型';
      };
  };
};
