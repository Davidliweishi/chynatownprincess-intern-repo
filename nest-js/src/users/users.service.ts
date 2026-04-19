import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

@Injectable()
export class UsersService {
  private emailVerificationApi = 'https://api.emailverify.com/verify';

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      // STEP 1. verify the email 
      const response = await axios.post(this.emailVerificationApi, {
        email: createUserDto.email,
      });

      // STEP 2. Check if the email is valid 
      if (!response.data || !response.data.isValid) {
        throw new BadRequestException('Email is invalid');
      }

      // STEP 3. create user in memory
      const user = this.userRepository.create(createUserDto);

      // STEP 4. save to database and return
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      const message = error instanceof Error ? error.message : 'Email verification failed';
      throw new BadRequestException(
      );
    }
  }

  async verifyEmail(email: string): Promise<boolean> {
    try {
      const response = await axios.post(this.emailVerificationApi, {
        email,
      });
      return response.data.isValid;
    } catch (error) {
      throw new BadRequestException('Email verification failed');
    }
  }

  // READ ALL
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // READ ONE
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // UPDATE
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id); // Check if user exists first
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  // DELETE
  async remove(id: number): Promise<UserEntity> {
    const user = await this.findOne(id); // Check if exists
    await this.userRepository.delete(id);
    return user;
  }
}