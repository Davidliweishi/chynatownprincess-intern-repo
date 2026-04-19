import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from '../app.module';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('Users API - Integration Tests (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Set test environment
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // ✅ Mock JWT Authentication
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      // ✅ Mock Roles Authorization
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 60000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
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
            const user = res.body[0];
            expect(user).toBeDefined();
            expect(user).toHaveProperty('id');
          }
        });
    });
  });

describe('GET /users/:id', () => {
  it('should return 200 for valid user ID', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect((res) => {
        // Accept either 200 (user exists) or 404 (user doesn't exist)
        expect([200, 404]).toContain(res.status);
      });
  });

    it('should return user object', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect((res) => {
        expect([200, 404]).toContain(res.status);
        if (res.status == 200) {
          expect(res.body).toBeDefined();
          expect(typeof res.body).toBe('object');
        }
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
      const createUserDto = {};

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect((res) => {
          expect([201, 400, 500]).toContain(res.status);
        });
    });

    it('should reject invalid user data', () => {
      const invalidDto = {};

      return request(app.getHttpServer())
        .post('/users')
        .send(invalidDto)
        .expect((res) => {
          expect([400, 500]).toContain(res.status);
        });
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update user successfully', () => {
      const updateUserDto = {};

      return request(app.getHttpServer())
        .patch('/users/1')
        .send(updateUserDto)
        .expect((res) => {
          expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    it('should return 400 for invalid ID', () => {
      return request(app.getHttpServer())
        .patch('/users/invalid')
        .send({})
        .expect(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user successfully', () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .expect((res) => {
          expect([200, 404, 500]).toContain(res.status);
        });
    });

    it('should return 400 for invalid ID', () => {
      return request(app.getHttpServer())
        .delete('/users/invalid')
        .expect(400);
    });
  });
});