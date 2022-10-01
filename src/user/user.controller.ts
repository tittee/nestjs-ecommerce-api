import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

//add
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User sign up' })
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all user data' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:email')
  @ApiOperation({ summary: 'Get user profile' })
  profile(@Param('email') email: string) {
    return this.userService.getProfile(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // @ApiOperation({ summary: 'Update user data' })
  // update(@Param('id') email: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(email, updateUserDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch('change-password/:id')
  // @ApiOperation({ summary: 'Change user password for admin mode' })
  // changepassword(
  //   @Param('id') id: number,
  //   @Body() ChangePasswordDto: ChangeUserPasswordDto,
  // ) {
  //   return this.userService.changepassword(id, ChangePasswordDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete user data by id' })
  // remove(@Param('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
