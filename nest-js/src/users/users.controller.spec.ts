import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: UserEntity = {
    id: 1,
    email: 'john@example.com',
    name: 'John Doe',
    password: 'hashedPassword123',
    isActive: true,
    secretNote: null,
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createUserDto: CreateUserDto = {
    email: 'jane@example.com',
    name: 'Jane Doe',
    password: 'password123',
  };

  const updateUserDto: UpdateUserDto = {
    name: 'Jane Updated',
    email: 'jane.updated@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({})
      .overrideGuard(RolesGuard)
      .useValue({})
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // each of these are a unit test 
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Create a user
  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(mockUser);
    const result = await controller.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  //return all user
  it('should return all users', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([mockUser]);
    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
  });

  //retunr user by ID
  it('should return user by ID', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockUser);
    const result = await controller.findOne(1);
    expect(result).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  //update a user
  it('should update a user', async () => {
    const updated = { ...mockUser, name: 'Updated' };
    jest.spyOn(service, 'update').mockResolvedValueOnce(updated);
    const result = await controller.update(1, updateUserDto);
    expect(result.name).toBe('Updated');
    expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  // delete a user
  it('should delete a user', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(mockUser);
    const result = await controller.remove(1);
    expect(result).toEqual(mockUser);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  //user not found
  it('should handle user not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException('User not found'));
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });
});