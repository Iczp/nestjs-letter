import { SetMetadata } from '@nestjs/common';
export const AllowAnonymousKey = 'allowAnonymous';
export const AllowAnonymous = () => SetMetadata(AllowAnonymousKey, true);
