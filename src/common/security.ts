import { NotImplementedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const encrypt = async (input: string) => {
  const salt = await bcrypt.genSalt(); // 可以指定工作因子，例如bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(input, salt);
  return hashedPassword;
};

export const decrypt = () => {
  throw new NotImplementedException('Not Implemented: Decrypt');
};

export const compare = async (
  data: string | Buffer,
  encrypted: string,
): Promise<boolean> => {
  return await bcrypt.compare(data, encrypted);
};
