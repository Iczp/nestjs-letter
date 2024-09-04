// src/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/ban-types
  override logIn<TRequest extends { logIn: Function } = any>(
    request: TRequest,
  ): Promise<void> {
    console.log('JwtAuthGuard', 'logIn');

    return super.logIn(request);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info, context: ExecutionContext) {
    console.log('JwtAuthGuard handleRequest', user, info);

    if (err || !user) {
      throw err || new UnauthorizedException('Custom unauthorized message');
    }
    return user;
  }
}
