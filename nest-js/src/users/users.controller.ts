// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Logger,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() req: any
  ) {
    // Log headers
    this.logger.log('Request headers:', JSON.stringify(req.headers));
    
    // Log payload
    this.logger.log('Creating user:', JSON.stringify(createUserDto));
    
    try {
      const result = await this.usersService.create(createUserDto);
      this.logger.log('User created successfully:', JSON.stringify(result));
      return result;
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error('Error creating user:', errorMessage);
      this.logger.error('Full error:', JSON.stringify(error));
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  @Get()
  async findAll(
    @Request() req: any
  ) {
    this.logger.log('Request headers:', JSON.stringify(req.headers));
    this.logger.log('Fetching all users');
    const users = await this.usersService.findAll();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any
  ) {
    this.logger.log('Request headers:', JSON.stringify(req.headers));
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.usersService.findOne(id);
    this.logger.log(`User found:`, JSON.stringify(user));
    return new UserEntity(user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any
  ) {
    this.logger.log('Request headers:', JSON.stringify(req.headers));
    this.logger.log(`Updating user ${id}:`, JSON.stringify(updateUserDto));
    const result = await this.usersService.update(id, updateUserDto);
    this.logger.log(`User ${id} updated successfully`);
    return result;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any
  ) {
    this.logger.log('Request headers:', JSON.stringify(req.headers));
    this.logger.log(`Deleting user with ID: ${id}`);
    const result = await this.usersService.remove(id);
    this.logger.log(`User ${id} deleted successfully`);
    return result;
  }
}