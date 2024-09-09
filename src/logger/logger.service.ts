import { ConsoleLogger, Injectable } from '@nestjs/common';
import { logger } from './logger.config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  override log(message: any, context?: string): void;
  override log(message: any, ...optionalParams: [...any, string?]): void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    logger.log(message as string, context);
  }
}
