import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { client } from 'src/edgedb';
import { Request, Response } from 'express';
@Injectable()
export class AuditsService {
  async logAudit(
    handler_name: string,
    request: Request,
    response: Response,
    duration: number,
    data: any,
    error: any,
  ) {
    const { method, url, headers } = request;
    Logger.log(`[END] [${method}] ${url} [${duration}ms]`, AuditsService.name);
    Logger.log(error.statusCode, 'error.statusCode');

    const isErr = !!error.message;
    const http_status = isErr
      ? error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      : response.statusCode;

    const insert = e.insert(e.logs.AuditLog, {
      app_name: e.str('NestJS'),
      user_id: e.str('admin'),
      duration,
      host: e.str(headers['host']),
      browser_info: e.str(headers['user-agent']),
      handler_name: e.str(handler_name),
      http_method: e.str(method),
      http_status: e.int64(http_status),
      url: e.str(url),
      data: e.json(data || {}),
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
