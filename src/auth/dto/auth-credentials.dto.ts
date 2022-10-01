import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Match } from './match.decorator';

export class AuthCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, {
    message: 'Email format incorrect.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsDate()
  created: Date;

  @IsDate()
  updated: Date;

  @IsNumber()
  enable: number;
}
