import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfigure } from './configures/swaggerConfigure';
// import { corsConfigure } from './configures/corsConfigure';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerConfigure(app, { path: '/' });

  // corsConfigure(app);

  // 全局注册异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());

  // 假设你已经通过 ConfigModule 设置了配置
  const configService = app.get(ConfigService); // 通过依赖注入获取 ConfigService

  const port = configService.get<number>('HOST_PORT') || 3002; // 从配置中获取 PORT

  const hostname = configService.get<string>('HOST_NAME'); // 从配置中获取 PORT

  await app.listen(port, hostname, () => {
    Logger.warn(`[hostname] ${hostname}:${port}`);
  });
}
bootstrap();
