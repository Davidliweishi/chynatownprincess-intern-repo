import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from '../app.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import axios from 'axios';

// ✅ Mock axios
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('POST /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    // ✅ Setup mock FIRST
    mockAxios.post.mockResolvedValue({
      status: 200,
      data: { isValid: true },
    });

    // ✅ Then create module with guard overrides
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 60000);

  afterAll(async () => {
    if (app) await app.close();
    jest.clearAllMocks();  // ✅ Clear mocks
  });

  describe('Success Cases', () => {
    it('should create user with valid data', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('John Doe');
        });
    });

    it('should create user with optional fields', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'SecurePassword456!',
          phoneNumber: '+1-234-567-8900',
        })
        .expect(201);
    });
  });

  describe('Validation Failures', () => {
    it('should reject missing email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'John Doe',
          password: 'SecurePassword123!',
        })
        .expect(400);
    });

    it('should reject missing password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
        })
        .expect(400);
    });

    it('should reject invalid email', () => {
      mockAxios.post.mockResolvedValueOnce({
        data: { isValid: false },
      });

      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'invalid@test.com',
          password: 'SecurePassword123!',
        })
        .expect(400);
    });
  });
});