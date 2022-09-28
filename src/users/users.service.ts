import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/chang-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, firstname, lastname, email, enable } = createUserDto;

      const hashedPassword = await bcrypt.hashSync(password, 10);
      console.log('username', createUserDto.username);
      const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        enable,
      });

      return await this.usersRepository.save(user);
    } catch (e) {
      console.log('error', e);
      throw new ConflictException({
        message: ['Username has been already using.'],
      });
    }
  }

  async findOne(id: number) {
    //Select *,(select firstname from user where user.id = p.userId) as p_owner_firstname,(select lastname from user where user.id = p.userId) as p_owner_lastname from promotion as p
    return await this.usersRepository
      .createQueryBuilder('m')
      .addSelect((subQuery) => {
        return subQuery
          .select('user.firstname')
          .from(User, 'user')
          .where('user.id = m.added_by');
      }, 'm_add_by_firstname')
      .addSelect((subQuery) => {
        return subQuery
          .select('user.lastname')
          .from(User, 'user')
          .where('user.id = m.added_by');
      }, 'm_add_by_lastname')
      .where('id =:id', { id })
      .getRawOne();
    //return await this.promoRepository.findOne({ where: { id } });
  }
  async getProfile(id: number): Promise<any> {
    return this.usersRepository.findOneBy({ id });
  }

  async findPassword(id: number): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id });
    return user.password;
  }

  async findAll(): Promise<User[]> {
    //Select *,(select firstname from user where user.id = p.userId) as p_owner_firstname,(select lastname from user where user.id = p.userId) as p_owner_lastname from promotion as p
    return await this.usersRepository
      .createQueryBuilder('m')
      .addSelect((subQuery) => {
        return subQuery
          .select('user.firstname')
          .from(User, 'user')
          .where('user.id = m.added_by');
      }, 'm_add_by_firstname')
      .addSelect((subQuery) => {
        return subQuery
          .select('user.lastname')
          .from(User, 'user')
          .where('user.id = m.added_by');
      }, 'm_add_by_lastname')
      .getRawMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (isNotEmpty(user)) {
      this.usersRepository.update(id, updateUserDto);
      return { status: 'update success.' };
    } else {
      return { status: 'user not found.' };
    }
  }

  async changepassword(id: number, changePasswordDto: ChangeUserPasswordDto) {
    const { password } = changePasswordDto;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (isNotEmpty(user)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      this.usersRepository.update(id, {
        password: hashedPassword,
      });
      return { status: 'password has been changed.' };
    } else {
      return { status: 'user not found.' };
    }
  }

  async remove(id: number): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (isNotEmpty(user)) {
      await this.usersRepository.update(id, {
        enable: 0,
      });
      return { status: 'delete data success.' };
    } else {
      return { status: 'user not found.' };
    }
  }

  async signUp(signupUpDto: SignUpDto): Promise<User> {
    try {
      const { password, firstname, lastname, email } = signupUpDto;

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
      });

      return await this.usersRepository.save(user);
    } catch (e) {
      console.log(e);
      throw new ConflictException({
        message: ['Username has been already using.'],
      });
    }
  }

  async findOneUser(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}
