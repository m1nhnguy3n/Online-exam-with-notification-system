import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email }
      });
      if (existingUser) {
        throw new BadRequestException({
          message: ERRORS_DICTIONARY.EMAIL_EXISTED
        });
      }
      const userData = this.userRepository.create(createUserDto);
      return this.userRepository.save(userData);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: UUID): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.EMAIL_EXISTED
      });
    }
    return userData;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: UUID): Promise<User> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }
}
