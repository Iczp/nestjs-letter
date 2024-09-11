import { ForbiddenException } from '@nestjs/common';
import { isGuid } from './validator';

export const If = (condition: boolean, message: string) => {
  if (!condition) {
    return;
  }

  throw new ForbiddenException(message);
};
export const IfNotGuid = (guid: any, message?: string) =>
  If(!isGuid(guid), message ?? `Invalid Guid:${guid}`);

export const IfTrue = <T>(val: T, message: string) => {
  if (val === true) {
    return val;
  }
  throw new ForbiddenException(message);
};

export const IfNotNull = <T>(val: T, message: string) => {
  if (val) {
    return val;
  }
  throw new ForbiddenException(message);
};
