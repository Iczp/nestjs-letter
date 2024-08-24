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
    .setContact(author, website, email)
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API Key',
      },
      'api-key', // 名称标识，用于关联到守卫
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(settings.path, app, document);
  return app;
};
