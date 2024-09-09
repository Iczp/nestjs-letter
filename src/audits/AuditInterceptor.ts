import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  INestApplication,
  Injectable,
  Logger,
  NestInterceptor,
  // Request,
  // Response,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { client } from 'src/edgedb';
import { UserDto } from 'src/users/dtos/UserDto';
import { Reflector } from '@nestjs/core';
import { AuditingKey } from './audits.decorator';
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly app: INestApplication<any>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();
    const handler = context.getHandler();
    const reflector = this.app.get(Reflector);
    const isAuditing = reflector.get<boolean>(
      AuditingKey,
      context.getHandler(),
    );

    if (!isAuditing) {
      console.log('auditing', context.getHandler(), isAuditing);
      next.handle();
    }

    // console.log(`Request: ${method} ${url}`);
    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        Logger.log(`[${handler.name}]`, AuditInterceptor.name);
        // Logger.log(data, 'Auditing data');
        this.logAudit(handler.name, request, response, duration, data, {});
      }),
      catchError((error) => {
        // Logger.error(error, 'err');
        // Logger.error(JSON.stringify(err), 'err44');
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
    const user = request.body['user'] as UserDto | undefined;
    // Logger.log(user, 'user');

    const isErr = !!error.message;
    const http_status = isErr
      ? error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      : response.statusCode;

    const insert = e.insert(e.logs.AuditLog, {
      app_name: e.str('NestJS'),
      user_id: e.str(user?.id ?? ''),
      user_name: e.str(user?.name ?? ''),
      duration,
      host: e.str(headers['host'] ?? ''),
      browser_info: e.str(headers['user-agent'] ?? ''),
      handler_name: e.str(handler_name ?? ''),
      http_method: e.str(method),
      http_status: e.int64(http_status),
      url: e.str(url),
      data: e.json(data ?? {}),
      error: e.json(
        isErr
          ? {
              message: error.message,
              stack: error.stack,
              date: Date.now(),
            }
          : {},
      ),
      headers: e.json(headers || {}),
    });

    await client.transaction(async (tx) => {
      const insertResult = await insert.run(tx);
      Logger.log(`[AuditsService] Inserted ${insertResult.id}`, 'Auditing');
    });
  }
}
