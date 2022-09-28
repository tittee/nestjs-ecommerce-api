import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/chang-password.dto';

//add
import { SignUpDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService,) {}

  @Post('signup')
  @ApiOperation({ summary: 'User sign up' })
  signUp(@Body() signUpDto: SignUpDto
  ): Promise<User> {
      return this.usersService.signUp(signUpDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create user data' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all user data' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  @ApiOperation({ summary: 'Get user profile' })
  profile(@Param('id') id: number) {
    return this.usersService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user data' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:id')
  @ApiOperation({ summary: 'Change user password for admin mode' })
  changepassword(@Param('id') id: number, @Body() ChangePasswordDto: ChangeUserPasswordDto) {
    return this.usersService.changepassword(id, ChangePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user data by id' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
