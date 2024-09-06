import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const startTime = Date.now();

    // console.log(`Request: ${method} ${url}`);

    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(
          `Response: ${method} ${url} - Status: ${response.statusCode} - Duration: ${duration}ms`,
        );
        // 执行自定义审计逻辑，例如将审计记录保存到数据库
        this.logAudit(request, response, duration, data);
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logAudit(request: any, response: any, duration: number, data: any) {
    // 这里可以执行实际的审计逻辑，例如保存到数据库或记录到日志文件
    const { method, url } = request;
    Logger.log(`[${method}] ${url} [${duration}ms]`, 'Auditing');
  }
}
