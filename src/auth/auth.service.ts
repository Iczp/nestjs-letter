// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as security from 'src/common/security';
import { Assert } from 'src/common';
import { isEmpty } from 'src/common/validator';
import { AuthInput, TokenResult } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from './jwtConstants';
import { BaseService } from 'src/bases/BaseService';
@Injectable()
export class AuthService extends BaseService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(input: AuthInput): Promise<TokenResult> {
    const { account, password, validate_code } = input;
    Assert.If(isEmpty(validate_code), `验证码不能为空`);
    const user = await this.userService.validatePassword(account, password);
    const username = user.name;
    const payload = { sub: user.id, username };
    const privateKey = this.configService.get<string>(JWT_SECRET);
    const accessToken = this.jwtService.sign(payload, {
      privateKey,
      expiresIn: '3600s', // 访问令牌的有效期
    });
    // this.jwtService.verify(accessToken, { secret: privateKey });
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        access_token: accessToken,
      },
      {
        privateKey,
        expiresIn: '7d', // 刷新令牌的有效期
      },
    );

    const passwordEncrypted = await security.encrypt(password);
    const isTrue = await security.compare(password, passwordEncrypted);
    console.log('passwordEncrypted', isTrue, password, passwordEncrypted);

    return {
      // username,
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    // await this.usersRepository.update(userId, { refreshToken });
    console.log('updateRefreshToken', userId, refreshToken);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.getItem(userId);

    if (!user || !refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { username: userId, sub: userId };
    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.updateRefreshToken(userId, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
