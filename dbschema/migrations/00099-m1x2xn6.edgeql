CREATE MIGRATION m1x2xn6zlrkdpggzvfprnl5yju347apoynlo3lvyf5o4thbd3tqtrq
    ONTO m1fvn5kg2idcsbzi5dja2tjstwt6uckjlfw77icfu2nimpxq7ekoaa
{
  ALTER TYPE default::Activity {
      CREATE PROPERTY image_size := (std::len(.image_base64));
  };
};
