import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password is minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
    },
  )
  password: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, {
    message: 'Email format incorrect.',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
    message: 'Phone format incorrect.',
  })
  phone: string;

  //defauft sto
  @ApiProperty()
  image: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  note: string;
  @ApiProperty()
  role: string;

  //use update when create
  @ApiProperty()
  added_by: number;
  //use update when edit
  @ApiProperty()
  updated_by: number;
  @ApiProperty()
  enable: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  address: string;
}
