// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenResult } from './dots/TokenResult';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<TokenResult> {
    const payload = { username, sub: username };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '3600s', // 访问令牌的有效期
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // 刷新令牌的有效期
    });

    // await this.usersService.updateRefreshToken(username, refreshToken);

    return {
      //   username,
      //   password,
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
