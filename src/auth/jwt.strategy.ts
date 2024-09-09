// src/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwtConstants';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,

    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // 请使用更安全的密钥
    });
  }

  async validate(payload: any) {
    // Logger.log(payload, JwtStrategy.name);

    // this.authService.
    const user = await this.userService.getItem(payload.sub);

    return user;
  }
}
