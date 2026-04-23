import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

async create(createUserDto: CreateUserDto) {
  this.logger.log('UsersService.create called');
  this.logger.log('Received DTO:', JSON.stringify(createUserDto));

  try {
    this.logger.log('Creating user entity');
    const user = new UserEntity({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
    });

    this.logger.log('User entity created:', JSON.stringify(user));
    this.logger.log('Attempting to save to database');
    
    const result = await this.usersRepository.save(user);
    
    this.logger.log('User saved successfully:', JSON.stringify(result));
    return result;
  } catch (error: any) {
    this.logger.error('Service error:', error.message);
    this.logger.error('Full service error:', JSON.stringify(error));
    throw error;
  }
}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      await this.usersRepository.delete(id);
    }
    return user;
  }
}