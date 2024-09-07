import { SetMetadata } from '@nestjs/common';
export const AllowAnonymousKey = 'AllowAnonymous';
export const AllowAnonymous = () => SetMetadata(AllowAnonymousKey, true);
