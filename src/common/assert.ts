import { ForbiddenException } from '@nestjs/common';

export const If = (condition: boolean, message: string) => {
  if (!condition) {
    return;
  }

  throw new ForbiddenException(message);
};

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
