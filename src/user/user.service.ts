import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, passwordConfirm, firstname, lastname, enable } =
      createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      passwordConfirm,
      firstname,
      lastname,
      enable,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async getProfile(email: string): Promise<any> {
    return this.usersRepository.findOneBy({ email });
  }

  async findPassword(email: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ email });
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

  async findOneUser(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}
