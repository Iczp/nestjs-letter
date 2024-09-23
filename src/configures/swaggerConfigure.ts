import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  name,
  version,
  description,
  email,
  website,
  author,
} from '../../package.json';

declare module '@nestjs/common' {
  interface INestApplication {
    swaggerConfigure(options?: SwaggerOptions): INestApplication;
  }
}

export const ApiKey = 'erp-user-id';

export type SwaggerOptions = {
  path: string;
};

export const swaggerConfigure = (
  app: INestApplication<any>,
  config?: SwaggerOptions,
) => {
  const settings = config || { path: '/docs' };

  console.log(name, version);

  // Swagger 配置
  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .setExternalDoc('letter', 'https://vvll.net')
    .setContact(author, website, email)
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-user-id',
        in: 'header',
        description: 'Erp User Id',
      },
      ApiKey, // 名称标识，用于关联到守卫
    )

    // 添加 JWT Bearer 认证
    .addBearerAuth(
      {
        type: 'http', // 类型为 http
        scheme: 'bearer', // 认证方案为 bearer
        bearerFormat: 'JWT', // (可选) 说明令牌的格式，通常为 'JWT'
        in: 'header', // (可选) 指定认证信息的位置，通常为 header
        description: 'Please enter your token bearer', // (可选) 描述信息
      },
      'bearer',
    ) // 名称标识，用于关联到守卫

    .build();
  const document = SwaggerModule.createDocument(app, options);

  console.log('swagger document', document);
  SwaggerModule.setup(settings.path, app, document, {
    jsonDocumentUrl: 'swagger.json',
  });
  return app;
};
