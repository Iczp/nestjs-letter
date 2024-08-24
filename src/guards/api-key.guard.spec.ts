import { ExecutionContext } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { Test } from '@nestjs/testing';
describe('ApiKeyGuard', () => {
  // it('should be defined', () => {
  //   expect(new ApiKeyGuard()).toBeDefined();
  // });

  let guard: ApiKeyGuard;
  let contextMock: ExecutionContext;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiKeyGuard],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);

    // 你需要模拟 ExecutionContext，这通常涉及一些复杂的设置
    // 这里只是一个占位符，你需要根据你的需求来模拟它
    contextMock = {} as ExecutionContext;
  });

  it('should return true/false based on some condition', () => {
    // 这里你需要设置 contextMock 以反映不同的测试场景
    // 并调用 guard.canActivate(contextMock) 来测试其行为
    // 注意：实际的实现将取决于你的 ApiKeyGuard 如何处理 ExecutionContext

    guard.canActivate(contextMock);
  });
});
