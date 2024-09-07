// src/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/users/user.current';
import { AllowAnonymousKey } from './allowAnonymousKey.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly currentUser: CurrentUser,
    // private readonly currentUser: UserService,
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
    Logger.log(user, 'JwtAuthGuard handleRequest user');

    Logger.log(context.getHandler().name, 'JwtAuthGuard getHandler');

    const request = context.switchToHttp().getRequest();

    Logger.log(request.headers.authorization, 'JwtAuthGuard request');

    if (user) {
      this.currentUser.user = user;
    }

    if (err || !user) {
      throw err || new UnauthorizedException('未登录或登录已过期');
    }
    return user;
  }
}
