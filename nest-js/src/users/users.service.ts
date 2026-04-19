import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';


@Injectable()
export class UsersService {

  private emailVerificationApi = 'https://api.emailverify.com/verify'; // verifyies the email

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    
    // STEP 1. verify if the email is real 
    //const isValidEmail = await this.verifyEmail(createUserDto.email);
    
    // STEP 2. stop if the email is invalid
   // if (!isValidEmail) {
   //   throw new BadRequestException('Email is not valid');
   // }

    // STEP 3. create user in memory
    const user = this.userRepository.create(createUserDto);

    // STEP 4. save to database and return
    return await this.userRepository.save(user);
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
  async findAll() {
    return await this.userRepository.find();
  }

  // READ ONE
  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // UPDATE
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Check if user exists first
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  // DELETE
  async remove(id: number) {
    const user = await this.findOne(id); // Check if exists
    await this.userRepository.delete(id);
    return user;
  }
}