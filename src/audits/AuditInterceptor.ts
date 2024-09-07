import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { method, url, headers, params, query, body } = request;
    const startTime = Date.now();

    // 记录请求的 headers、params、query、body 信息
    // console.log(`Request: ${method} ${url}`);
    // console.log('Headers:', headers);
    // console.log('Params:', params);
    // console.log('Query:', query);
    // console.log('Body:', body);

    const handler = context.getHandler();

    // console.log(`Request: ${method} ${url}`);

    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(
          `Response: ${method} ${url} - Status: ${response.statusCode} - Duration: ${duration}ms`,
        );
        // console.log(
        //   `query: ${JSON.stringify(query)} ${JSON.stringify(params)} - body: ${JSON.stringify(body)} - Duration: ${duration}ms`,
        // );
        // console.log(`headers: ${JSON.stringify(headers)} `);
        Logger.log(`[${handler.name}]`, 'Auditing');
        // 执行自定义审计逻辑，例如将审计记录保存到数据库
        this.logAudit(request, response, duration, data);
      }),
      catchError((error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(
          `Error Response: ${method} ${url} - Status: ${response.statusCode || 500} - Duration: ${duration}ms - Error: ${error.message}`,
        );

        // 记录失败请求的审计信息
        // this.logAudit(request, response, duration, null, error);

        // 继续抛出异常
        return throwError(() => error);
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logAudit(request: any, response: any, duration: number, data: any) {
    // 这里可以执行实际的审计逻辑，例如保存到数据库或记录到日志文件
    const { method, url } = request;
    Logger.log(
      `[END] [${method}] ${url} [${duration}ms]`,
      AuditInterceptor.name,
    );
  }
}
