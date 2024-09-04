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
// import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
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
    console.log('req', req);
    return {
      ser: null,
    };
  }
}
