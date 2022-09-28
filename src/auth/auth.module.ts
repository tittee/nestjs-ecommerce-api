import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
