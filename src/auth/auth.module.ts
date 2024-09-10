import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JWT_SECRET, jwtConstants } from './jwtConstants';
import { UsersService } from 'src/users/user.service';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { CurrentUser } from 'src/users/users.current';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get(JWT_SECRET) || jwtConstants.secret;
        console.log('secret**', secret);
        return {
          global: true,
          secret,
          signOptions: { expiresIn: '3600s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    CurrentUser,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
