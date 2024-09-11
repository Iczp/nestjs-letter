import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { client, e } from 'src/edgedb';
import { Reflector } from '@nestjs/core';
import { AuditingKey } from './audits.decorator';
import { UserDto } from 'src/users/users.dto';
import { IncomingHttpHeaders } from 'http';
import { BaseService } from 'src/bases/BaseService';
import { logger } from 'src/logger/logger.config';
@Injectable()
export class AuditsService extends BaseService {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async shouldBeLog(context: ExecutionContext) {
    try {
      const reflector = this.reflector; // this.app.get(Reflector);

      const isAuditingInClass = reflector.get<boolean>(
        AuditingKey,
        context.getClass(),
      );

      const isAuditingInMethod = reflector.get<boolean>(
        AuditingKey,
        context.getHandler(),
      );

      if (isAuditingInMethod === false || isAuditingInClass === false) {
        console.log('auditing', context.getHandler(), isAuditingInMethod);
        console.log(
          'isAuditingInClass',
          context.getClass().name,
          isAuditingInClass,
        );
        return false;
      }
    } catch (error) {
      logger.warn(error, 'AAA');
    }

    return true;
  }
  async ignoreHeaders() {
    return [
      'host',
      'referer',
      'user-agent',
      'accept-language',
      'accept-encoding',
      'authorization',
    ];
  }
  async getIpAddress(headers: IncomingHttpHeaders, request: Request) {
    return (headers['x-forwarded-for'] ||
      request.connection.remoteAddress) as string;
  }

  async errAudit(context: ExecutionContext, startTime: number, error: any) {
    return await this.logAudit(context, startTime, {}, error);
  }
  async infoAudit(context: ExecutionContext, startTime: number, data: any) {
    return await this.logAudit(context, startTime, data, {});
  }

  async logAudit(
    context: ExecutionContext,
    startTime: number,
    data: any,
    error: any,
  ) {
    if (!(await this.shouldBeLog(context))) {
      return;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const handler = context.getHandler();
    const service = context.getClass();

    Logger.log(`[${service?.name}] ${handler?.name} `, AuditsService.name);

    const { method, url, headers } = request;
    Logger.log(`[END] [${method}] ${url} [${duration}ms]`, AuditsService.name);

    const ip = await this.getIpAddress(headers, request);

    const user = request.body['user'] as UserDto | undefined;

    Logger.log(
      `request.body['user']:${JSON.stringify(user)}`,
      AuditsService.name,
    );

    const isErr = !!error.message;
    const http_status = isErr
      ? error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      : response.statusCode;
    const ignoreHeaders = await this.ignoreHeaders();
    const headerObject = {};
    Object.keys(headers)
      .filter((x) => !ignoreHeaders.includes(x))
      .forEach((x) => {
        headerObject[x] = headers[x];
      });

    const insert = e.insert(e.logs.AuditLog, {
      app_name: e.str('NestJS'),
      user_id: e.str(user?.id ?? ''),
      user_name: e.str(user?.name ?? ''),
      duration,
      host: e.str(headers['host'] ?? ''),
      browser_info: e.str(headers['user-agent'] ?? ''),
      referer: e.str(headers['referer'] ?? ''),
      accept_language: e.str(headers['accept-language'] ?? ''),
      accept_encoding: e.str((headers['accept-encoding'] as string) ?? ''),
      class_name: e.str(service?.name ?? ''),
      handler_name: e.str(handler?.name ?? ''),
      http_method: e.str(method),
      http_status: e.int64(http_status),
      ip: e.str(ip || ''),
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
      headers: e.json(headerObject || {}),
    });

    await client.transaction(async (tx) => {
      const insertResult = await insert.run(tx);
      Logger.log(`Inserted ${insertResult.id}`, AuditsService.name);
    });
  }
}
