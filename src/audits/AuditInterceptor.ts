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
import { Request, Response } from 'express';
import { AuditsService } from './audits.service';
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(protected readonly auditService: AuditsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();
    const handler = context.getHandler();

    // console.log(`Request: ${method} ${url}`);
    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        Logger.log(`[${handler.name}]`, AuditInterceptor.name);
        // Logger.log(data, 'Auditing data');
        this.auditService.logAudit(
          handler.name,
          request,
          response,
          duration,
          data,
          {},
        );
      }),
      catchError((error) => {
        // Logger.error(error, 'err');
        // Logger.error(JSON.stringify(err), 'err44');
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.auditService.logAudit(
          handler.name,
          request,
          response,
          duration,
          {},
          error,
        );
        // 继续抛出异常
        return throwError(() => error);
      }),
    );
  }
}
