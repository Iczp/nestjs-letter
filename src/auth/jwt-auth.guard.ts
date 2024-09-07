// src/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestContext } from 'src/request-context/request-context';
import { CurrentUser } from 'src/users/user.current';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly requestContext: RequestContext,
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
      throw err || new UnauthorizedException('Custom unauthorized message');
    }
    return user;
  }
}
