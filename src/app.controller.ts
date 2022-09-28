import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { JwtAuthGuard } from './auth/jwt/jwt-auth.guards';
import { LocalAuthGuard } from './auth/local/local-auth.guards';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.signIn(req.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.email;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
