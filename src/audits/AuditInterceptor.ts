import {
  CallHandler,
  ExecutionContext,
  INestApplication,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuditsService } from './audits.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private app: INestApplication<any>;
  constructor(private readonly auditsService: AuditsService) {}
  setApp(app: INestApplication<any>) {
    this.app = app;
    return this;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    Logger.log(`startTime:  ${startTime}`, AuditInterceptor.name);
    return next.handle().pipe(
      tap((data) => {
        this.auditsService.logAudit(context, startTime, data, {});
      }),
      catchError((error) => {
        this.auditsService.logAudit(context, startTime, {}, error);
        // 继续抛出异常
        return throwError(() => error);
      }),
    );
  }
}
