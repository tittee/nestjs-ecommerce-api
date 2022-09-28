import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
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

  @ApiProperty()
  address: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  note: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  added_by: number;
  @ApiProperty()
  updated_by: number;
}
