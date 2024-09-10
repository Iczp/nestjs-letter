// src/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.userService.(username);
    // if (!user || user.password !== password) {
    //   throw new UnauthorizedException();
    // }
    return {
      username,
      password,
    };
  }
}
