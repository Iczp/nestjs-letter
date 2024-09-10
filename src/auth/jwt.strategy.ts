// src/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET, jwtConstants } from './jwtConstants';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UsersService,
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const secretOrKey =
      configService.get<string>(JWT_SECRET) || jwtConstants.secret;

    console.log(`secretOrKey:`, secretOrKey);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: any) {
    // Logger.log(payload, JwtStrategy.name);

    // this.authService.
    const user = await this.userService.getItem(payload.sub);
    return user;
    // return payload;
  }
}
