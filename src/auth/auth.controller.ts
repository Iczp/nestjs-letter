import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseController } from 'src/bases/BaseController';
import { AuthInput } from './dots/AuthInput';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/users/user.current';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    private readonly currentUser: CurrentUser,
  ) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() input: AuthInput) {
    return this.authService.signIn(input.username, input.password);
  }

  //   @UseGuards(AuthGuard('jwt'))
  //   @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // console.log('req', req);
    const reqUser = this.currentUser.user;
    return {
      user: req.user,
      reqUser,
    };
  }

  @Post('refresh-token')
  public async refreshToken(
    @Body() refreshTokenDto: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshTokens(
      refreshTokenDto.userId,
      refreshTokenDto.refreshToken,
    );
  }
}
