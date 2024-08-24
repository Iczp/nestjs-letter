import { PublicGuard } from './public.guard';

describe('PublicGuard', () => {
  it('should be defined', () => {
    expect(new PublicGuard()).toBeDefined();
  });
});
