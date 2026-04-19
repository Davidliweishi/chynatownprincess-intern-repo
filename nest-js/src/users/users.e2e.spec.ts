import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from '../app.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Users API - Integration Tests (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    mockAxios.post.mockResolvedValue({
      status: 200,
      data: { isValid: true },
    });

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
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return status 200', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });

    it('should return an array of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should validate user object structure', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
          }
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200 or 404 for user ID', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect((res) => {
          expect([200, 404]).toContain(res.status);
        });
    });

    it('should return user object or 404', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect((res) => {
          expect([200, 404]).toContain(res.status);
        });
    });

    it('should return 400 for non-numeric ID', () => {
      return request(app.getHttpServer())
        .get('/users/invalid')
        .expect(400);
    });

    it('should handle non-existent user ID', () => {
      return request(app.getHttpServer())
        .get('/users/999999')
        .expect((res) => {
          expect([404, 500]).toContain(res.status);
        });
    });
  });

  describe('POST /users', () => {
    it('should create user with valid data', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test User');
        });
    });

    it('should create user with optional fields', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Full User',
          email: 'full@example.com',
          password: 'SecurePassword123!',
          phoneNumber: '+1-555-1234',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.phoneNumber).toBe('+1-555-1234');
        });
    });

    it('should reject missing email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'No Email',
          password: 'SecurePassword123!',
        })
        .expect(400);
    });

    it('should reject missing password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'No Password',
          email: 'nopass@example.com',
        })
        .expect(400);
    });

    it('should reject missing name', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'noname@example.com',
          password: 'SecurePassword123!',
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
          name: 'Invalid Email',
          email: 'invalid@test.com',
          password: 'SecurePassword123!',
        })
        .expect(400);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update user successfully', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Original Name',
          email: 'update@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      return request(app.getHttpServer())
        .patch(`/users/${createRes.body.id}`)
        .send({ name: 'Updated Name' })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated Name');
        });
    });

    it('should update multiple fields', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Multi',
          email: 'multi@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      return request(app.getHttpServer())
        .patch(`/users/${createRes.body.id}`)
        .send({
          name: 'New Name',
          phoneNumber: '+1-234-567-8900',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('New Name');
          expect(res.body.phoneNumber).toBe('+1-234-567-8900');
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .patch('/users/99999')
        .send({ name: 'Test' })
        .expect(404);
    });

    it('should return 400 for invalid ID', () => {
      return request(app.getHttpServer())
        .patch('/users/invalid')
        .send({})
        .expect(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user successfully', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'To Delete',
          email: 'delete@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      return request(app.getHttpServer())
        .delete(`/users/${createRes.body.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createRes.body.id);
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .delete('/users/99999')
        .expect(404);
    });

    it('should return 400 for invalid ID', () => {
      return request(app.getHttpServer())
        .delete('/users/invalid')
        .expect(400);
    });

    it('should not find user after deletion', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Verify Delete',
          email: 'verify-delete@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/users/${createRes.body.id}`)
        .expect(200);

      return request(app.getHttpServer())
        .get(`/users/${createRes.body.id}`)
        .expect(404);
    });

    it('should return 404 on second delete', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Delete Twice',
          email: 'delete-twice@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/users/${createRes.body.id}`)
        .expect(200);

      return request(app.getHttpServer())
        .delete(`/users/${createRes.body.id}`)
        .expect(404);
    });
  });
});