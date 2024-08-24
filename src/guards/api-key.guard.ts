import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AllowAnonymousKey } from './allowAnonymousKey.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  isDevelopmentMode(): boolean {
    // 检查 NODE_ENV 环境变量是否设置为 'development'
    return process.env.NODE_ENV === 'development';
  }

  canActivate(context: ExecutionContext): boolean {
    console.log('ApiKeyGuard', context.getHandler());

    const hasAllowAnonymous = this.reflector.get<boolean>(
      AllowAnonymousKey,
      context.getHandler(),
    );
    console.log('hasAllowAnonymous', hasAllowAnonymous);

    if (hasAllowAnonymous) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.query['api-key'] || request.headers['x-api-key']; // 从请求头中获取 API Key
    const envApiKey = this.configService.get<string>('API_KEY') || undefined; // 从环境变量中获取有效的 API Key
    console.log('apiKey', apiKey);
    console.log('envApiKey', envApiKey);
    if (this.isDevelopmentMode()) {
      console.log('request.query', request.query['api-key']);
      console.log('request.params', request.params);
      return true;
    }
    if (apiKey === envApiKey) {
      return true;
    } else {
      throw new UnauthorizedException(`Invalid API key: ${apiKey}`);
    }
  }
}
