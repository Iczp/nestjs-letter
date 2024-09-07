import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './jwtConstants';
import { UserService } from 'src/users/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RequestContext } from 'src/request-context/request-context';
import { CurrentUser } from 'src/users/user.current';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RequestContext,
    CurrentUser,
  ],
  controllers: [AuthController],
  exports: [AuthService, RequestContext],
})
export class AuthModule {}
