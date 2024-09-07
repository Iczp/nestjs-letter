import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from './request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly requestContext: RequestContext) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('req.user', RequestContextMiddleware.name);
    // 确保每个请求运行在 AsyncLocalStorage 的上下文中
    this.requestContext.run({ user: null }, next);
  }
}
