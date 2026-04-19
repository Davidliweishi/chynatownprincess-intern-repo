jest.mock('axios');

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import axios from 'axios';

// ✅ Type the axios mock
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // this here means you are testing a repository
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => jest.clearAllMocks());

  // ✅ UPDATED: Now mocks axios for email verification
  it('should create a user', async () => {
    // ← ADD THIS: Mock axios.post for email verification
    mockAxios.post.mockResolvedValue({
      data: { isValid: true }, // Email is valid
    });

    // example of dependency mocking right here
    jest.spyOn(repository, 'create').mockReturnValue(mockUser);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockUser);

    const result = await service.create({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });

    // WITH mocking (returns fake data)
    expect(result).toEqual(mockUser);
  });

  describe('findAll', () => {
    it('should return all users with correct data', async () => {
      const users = [
        mockUser,
        { ...mockUser, id: 2, email: 'jane@example.com' },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      // ✅ Specific assertions
      expect(result).toHaveLength(2);
      expect(result[0].email).toBe('john@example.com');
      expect(result[1].email).toBe('jane@example.com');
    });

    it('should return empty array when no users exist', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });

    it('should throw error when repository fails', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('DB Error'));
      await expect(service.findAll()).rejects.toThrow('DB Error');
    });
  });

  it('should return user by ID', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockUser);
    const result = await service.findOne(1);
    expect(result).toEqual(mockUser);
  });

  it('should throw NotFoundException when user not found', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updated = { ...mockUser, name: 'Updated' };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockUser);
    jest.spyOn(repository, 'update').mockResolvedValueOnce({
      generatedMaps: [],
      raw: [],
      affected: 1,
    });
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(updated);

    const result = await service.update(1, { name: 'Updated' });
    expect(result.name).toBe('Updated');
  });

  it('should delete a user', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockUser);
    jest.spyOn(repository, 'delete').mockResolvedValueOnce({
      affected: 1,
      raw: [],
    });

    const result = await service.remove(1);
    expect(result).toEqual(mockUser);
  });

  // ✅ BONUS: Test error cases
  it('should NOT create user if email verification fails', async () => {
    // Mock axios to fail (API down)
    mockAxios.post.mockRejectedValue(new Error('API down')); // problem error

    await expect(
      service.create({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      }),
    ).rejects.toThrow(BadRequestException);

    // Verify repository.save was NOT called
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should NOT create user if email is invalid', async () => {
    // Mock axios to say email is invalid
    mockAxios.post.mockResolvedValue({
      data: { isValid: false },
    });

    await expect(
      service.create({
        email: 'invalid@example.com',
        name: 'Test User',
        password: 'password123',
      }),
    ).rejects.toThrow(BadRequestException);

    // Verify repository.save was NOT called
    expect(repository.save).not.toHaveBeenCalled();
  });
});
