import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

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

  //Unit tests
  it('should create a user', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(mockUser);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockUser);

    const result = await service.create({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });

    expect(result).toEqual(mockUser);
  });

  it('should return all users', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([mockUser]);
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
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
});