import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseController } from 'src/bases/BaseController';
import { ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from './allowAnonymousKey.decorator';
import { AuthInput } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @AllowAnonymous()
  public signIn(@Body() input: AuthInput) {
    return this.authService.signIn(input);
  }

  //   @UseGuards(AuthGuard('jwt'))
  //   @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
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
