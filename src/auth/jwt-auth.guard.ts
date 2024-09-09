// src/jwt-auth.guard.ts
import {
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AllowAnonymousKey } from './allowAnonymousKey.decorator';
import { CurrentUser } from 'src/users/users.current';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    // @Inject(CurrentUser.name)
    private currentUser: CurrentUser,
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  override logIn<TRequest extends { logIn: Function } = any>(
    request: TRequest,
  ): Promise<void> {
    Logger.log('JwtAuthGuard', 'logIn');

    return super.logIn(request);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const hasAllowAnonymous = this.reflector.get<boolean>(
      AllowAnonymousKey,
      context.getHandler(),
    );
    console.log('hasAllowAnonymous', hasAllowAnonymous);

    if (hasAllowAnonymous) {
      return true;
    }
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info, context: ExecutionContext) {
    // Logger.log(user, 'JwtAuthGuard handleRequest user');

    // Logger.log(context.getHandler().name, 'JwtAuthGuard getHandler');

    const request = context.switchToHttp().getRequest();

    // Logger.log(request.headers.authorization, 'JwtAuthGuard request');

    if (user) {
      request.body['user'] = user;
      this.currentUser.user = user;
    }

    if (err || (!user && process.env.NODE_ENV === 'production')) {
      throw err || new UnauthorizedException('未登录或登录已过期');
    }
    return user;
  }
}
