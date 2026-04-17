import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from '../app.module';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('Users API - Integration Tests (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return status 200', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200);
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
            expect(res.body[0]).toBeDefined();
          }
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200 for valid user ID', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect(200);
    });

    it('should return user object', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(typeof res.body).toBe('object');
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
      const createUserDto = {
        email: 'test@example.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);
    });

    it('should reject invalid user data', () => {
      const invalidDto = {
        email: 'invalid-email',
        password: '123',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update user successfully', () => {
      const updateUserDto = {
        firstName: 'Updated',
      };

      return request(app.getHttpServer())
        .patch('/users/1')
        .send(updateUserDto)
        .expect(200);
    });

    it('should return 400 for invalid ID', () => {
      const updateUserDto = {
        firstName: 'Updated',
      };

      return request(app.getHttpServer())
        .patch('/users/invalid')
        .send(updateUserDto)
        .expect(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user successfully', () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .expect(200);
    });

    it('should return 400 for invalid ID', () => {
      return request(app.getHttpServer())
        .delete('/users/invalid')
        .expect(400);
    });
  });
});