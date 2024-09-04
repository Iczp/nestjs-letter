// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    // const user = await this.userService.getItem(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: username, username: password, password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
