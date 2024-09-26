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
import { Assert } from 'src/common';
import { isGuid } from 'src/common/validator';
import { ErpUsersService } from 'src/erp-users/erp-users.service';
import { client } from 'src/edgedb';

// require('./passport')(passport); // as strategy in ./passport.js needs passport object

@Injectable({
  // scope: Scope.REQUEST,
})
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    // @Inject(CurrentUser.name)
    private currentUser: CurrentUser,
    private erpUsersService: ErpUsersService,
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  // override logIn<TRequest extends { logIn: Function } = any>(
  //   request: TRequest,
  // ): Promise<void> {
  //   Logger.log('JwtAuthGuard', 'logIn');

  //   return super.logIn(request);
  // }

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
    // const request = context.switchToHttp().getRequest();
    // console.log('request', request);
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const erpUserId = request.header('x-user-id');

    if (erpUserId) {
      Assert.If(!isGuid(erpUserId), `登录Erp失败`, 401);
      const erpUser = this.erpUsersService
        .findOne(erpUserId)
        .then((res) => res);

      console.log('erpUser', erpUser);
    }

    console.log('erp-user-id', erpUserId);

    if (user) {
      request.body['user'] = user;
      this.currentUser.user = user;
      // edgedb current_user_id
      client.withGlobals({
        current_user_id: user.id,
      });

      Logger.log(`set user ${JSON.stringify(user)}`, JwtAuthGuard.name);
    }

    if (err || (!user && process.env.NODE_ENV === 'production')) {
      throw err || new UnauthorizedException('未登录或登录已过期');
    }
    return user;
  }
}
