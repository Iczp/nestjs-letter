import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
  INestApplication,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuditsService } from 'src/audits/audits.service';

@Catch() // 捕获所有异常
export class AllExceptionsFilter implements ExceptionFilter {
  private app: INestApplication<any>;
  constructor(private readonly auditsService: AuditsService) {}
  setApp(app: INestApplication<any>) {
    this.app = app;
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 输出异常信息到控制台
    Logger.error(`${exception.message}`, AllExceptionsFilter.name);
    Logger.error(` ${exception.stack}`, AllExceptionsFilter.name);

    // this.auditsService
    //   .errAudit(ctx as any, Date.now(), exception)
    //   .finally(() => {});

    // 可以根据需要调整响应内容
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      // 如果你想在响应中包含完整的堆栈跟踪（注意：这可能会暴露敏感信息）
      stack: exception.stack,
    });
  }
}
