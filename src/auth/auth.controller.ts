import { Body, Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
@ApiBearerAuth()
@ApiTags('SSO Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('signin')
  // @ApiConsumes('application/x-www-form-urlencoded')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       email: { type: 'string' },
  //       password: { type: 'string' },
  //     },
  //   },
  // })
  // @ApiOperation({ summary: 'Sign in' })
  // signIn(@Request() req: any): Promise<any> {
  //   return this.authService.signIn(req.user);
  // }
}
