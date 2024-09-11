import { SetMetadata } from '@nestjs/common';
export const AUTHORIZE = 'AUTHORIZE';
export const Authorize = (options?: AuthorizeOptions) => {
  // const opts = options || { policy, roles };
  return SetMetadata(AUTHORIZE, options);
};
export class AuthorizeOptions {
  roles?: string[];
  policy?: string;
}
