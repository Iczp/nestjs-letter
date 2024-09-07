import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  // Request,
  // Response,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { client } from 'src/edgedb';
import { Request, Response } from 'express';
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();
    const handler = context.getHandler();

    // console.log(`Request: ${method} ${url}`);
    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        Logger.log(`[${handler.name}]`, 'Auditing');
        Logger.log(data, 'Auditing data');
        this.logAudit(handler.name, request, response, duration, data, {});
      }),
      catchError((error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.logAudit(handler.name, request, response, duration, {}, error);
        // 继续抛出异常
        return throwError(() => error);
      }),
    );
  }

  async logAudit(
    handler_name: string,
    request: Request,
    response: Response,
    duration: number,
    data: any,
    error: any,
  ) {
    const { method, url, headers } = request;
    Logger.log(
      `[END] [${method}] ${url} [${duration}ms]`,
      AuditInterceptor.name,
    );
    Logger.log(Object.keys(response), AuditInterceptor.name);

    // Logger.log(response.type, AuditInterceptor.name);
    // Logger.log(response., AuditInterceptor.name);
    await client.transaction(async (tx) => {
      const insert = e.insert(e.audit.AuditLog, {
        app_name: e.str('NestJS'),
        user_id: e.str('admin'),
        duration,
        host: e.str(headers['host']),
        browser_info: e.str(headers['user-agent']),
        handler_name: e.str(handler_name),
        http_method: e.str(method),
        http_status: e.int64(response.statusCode),
        url: e.str(url),
        data: e.json(data || {}),
        error: e.json(error || {}),
        // params: e.json(params || {}),
        // query: e.json(query || {}),
        // params: e.json(body || {}),
        headers: e.json(headers || {}),
      });
      const insertResult = await insert.run(tx);
      Logger.log(`[AuditInterceptor] Inserted ${insertResult.id}`, 'Auditing');
    });
  }
}
