import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

declare module '@nestjs/common' {
  interface INestApplication {
    corsConfigure(): INestApplication;
  }
}

export const corsConfigure = (app: INestApplication<any>) => {
  const configService = app.get(ConfigService);

  // 读取环境变量
  const corsOrigin = configService.get<string>('CORS_ORIGIN');

  // const corsOrigin = process.env.CORS_ORIGIN;

  // 解析 CORS 原点
  const allowedOrigins = corsOrigin ? corsOrigin.split(',') : [];

  // 配置 CORS
  app.enableCors({
    origin: (origin, callback) => {
      console.log('CORS origin', origin);

      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Content-Disposition',
    // credentials: true,
  });
  return app;
};
