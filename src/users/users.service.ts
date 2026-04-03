import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  // repository (NEW)
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    const user = { id: this.nextId++, ...createUserDto };
    this.users.push(user);

    // NEW (database version)
    const dbUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(dbUser);

    return user; // still returning old version for now
  }

  findAll() {
    // OLD
    return this.users;

    // NEW (you can switch to this later)
    // return this.userRepository.find();
  }

  // READ ONE
  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;

    // NEW
    // const user = await this.userRepository.findOneBy({ id });
  }

  //UPDATE
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);

    // NEW
    await this.userRepository.update(id, updateUserDto);

    return user;
  }

  //DELETE
  async remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    const [removed] = this.users.splice(index, 1);

    // NEW
    await this.userRepository.delete(id);

    return removed;
  }
}
