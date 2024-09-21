import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfigure } from './configures/swaggerConfigure';
import { corsConfigure } from './configures/corsConfigure';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { API_PREFIX, HOST_NAME, HOST_PORT } from './configures/env';
// import { AllExceptionsFilter } from './common/AllExceptionsFilter';
// import { AuditInterceptor } from './audits/AuditInterceptor';
// import { logger } from './logger/logger.config';
// import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 假设你已经通过 ConfigModule 设置了配置
  const configService = app.get(ConfigService); // 通过依赖注入获取 ConfigService
  const apiPrefix = configService.get<string>(API_PREFIX) || 'api';
  app.setGlobalPrefix(apiPrefix);

  // app.useLogger(app.get(LoggerService));

  // logger.info('info', 'dd');

  swaggerConfigure(app, { path: '/' });

  corsConfigure(app);
  // app.enableCors({ origin: '*' });

  const port = configService.get<number>(HOST_PORT); // 从配置中获取 PORT

  const hostname = configService.get<string>(HOST_NAME); // 从配置中获取 PORT

  await app.listen(port, hostname, () => {
    Logger.warn(`[hostname] ${hostname}:${port}`);
  });
}
bootstrap();
