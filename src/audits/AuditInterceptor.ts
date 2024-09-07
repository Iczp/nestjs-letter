/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { client } from 'src/edgedb';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();
    const handler = context.getHandler();
    // console.log(`Request: ${method} ${url}`);
    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        Logger.log(`[${handler.name}]`, 'Auditing');
        this.logAudit(handler.name, request, response, duration, data, null);
      }),
      catchError((error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.logAudit(handler.name, request, response, duration, null, error);
        // 继续抛出异常
        return throwError(() => error);
      }),
    );
  }

  async logAudit(
    handler_name: string,
    request: any,
    response: any,
    duration: number,
    data: any,
    error: any,
  ) {
    const { method, url, headers, params, query, body } = request;
    Logger.log(
      `[END] [${method}] ${url} [${duration}ms]`,
      AuditInterceptor.name,
    );
    Logger.log(Object.keys(response), AuditInterceptor.name);

    Logger.log(response.outputData, AuditInterceptor.name);
    Logger.log(response.outputSize, AuditInterceptor.name);
    await client.transaction(async (tx) => {
      const insert = e.insert(e.audit.AuditLog, {
        app_name: e.str('NestJS'),
        user_id: e.str('admin'),
        duration,
        browser_info: e.str(headers['user-agent']),
        handler_name: e.str(handler_name),
        http_method: e.str(method),
        http_status: e.int64(response.statusCode),
        url: e.str(url),
        params: e.json(params),
        query: e.json(query),
        // body: e.str(body),
        headers: e.json(headers),
      });
      const insertResult = await insert.run(tx);
      Logger.log(`[AuditInterceptor] Inserted ${insertResult.id}`, 'Auditing');
    });
  }
}
