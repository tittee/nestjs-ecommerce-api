import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(): Promise<any> {
    return 'signUp';
  }

  // async signIn(
  //   authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const { email, password } = authCredentialsDto;
  //   const user = await this.usersService.findOne(email);

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload: JwtPayload = { email };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('Please check your login credentials');
  //   }
  // }

  async signIn(user: any): Promise<{ accessToken: string }> {
    console.log('signIn', user.id);
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getProfile(id: any): Promise<any> {
    console.log('getprofile', id);
    const user = await this.usersService.getProfile(id);
    return user;
  }
}
