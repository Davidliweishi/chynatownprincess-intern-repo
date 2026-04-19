jest.mock('axios'); //jest.mock() must be at the very top

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';  //make sure axios is installed
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// Take the mocked axios and tell TS it has all the Jest mocks
//Without this line, TS will throw an error saying your mock methods are undefined. 
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('UsersService - 3 Simple Tests', () => {
  let service: UsersService;
  let repository: any;
 
  const mockUser = {
    id: 1,
    email: 'jane@example.com',
    name: 'Jane Doe',
    password: 'hashed',
    isActive: true,
    secretNote: null,
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
 
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();
 
    service = module.get(UsersService);
    repository = module.get(getRepositoryToken(UserEntity));
  });
 
  afterEach(() => jest.clearAllMocks());
 
  // TEST 1: Email valid → Create user 
  it('should create user if email is valid', async () => {
    mockAxios.post.mockResolvedValue({ data: { isValid: true } });
    jest.spyOn(repository, 'create').mockReturnValue(mockUser);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser);
 
    const result = await service.create({ email: 'jane@example.com', name: 'Jane', password: 'pass' });
 
    expect(result.id).toBe(1);
    expect(repository.save).toHaveBeenCalled();
  });
 
  // TEST 2: API fails → Don't create user 
  it('should NOT create user if email verification fails', async () => {
    mockAxios.post.mockRejectedValue(new Error('API down'));
 
    await expect(service.create({ email: 'jane@example.com', name: 'Jane', password: 'pass' }))
      .rejects.toThrow();
 
    expect(repository.save).not.toHaveBeenCalled();
  });
 
  // TEST 3: Email invalid → Don't create user 
  it('should NOT create user if email is invalid', async () => {
    mockAxios.post.mockResolvedValue({ data: { isValid: false } });
 
    await expect(service.create({ email: 'jane@example.com', name: 'Jane', password: 'pass' }))
      .rejects.toThrow();
 
    expect(repository.save).not.toHaveBeenCalled();
  });
});