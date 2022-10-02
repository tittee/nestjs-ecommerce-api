import { IsNotEmpty, Matches, IsString, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from './match.decorator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, {
    message: 'Email format incorrect.',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @Match('password')
  passwordConfirm: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  updated: Date;

  @ApiProperty()
  enable: number;
}
