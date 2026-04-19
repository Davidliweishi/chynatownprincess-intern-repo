import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

// Creates a test suite called "POST /users"
describe('POST /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 60000);

  afterAll(async () => {
    if (app) await app.close();
  });

  // Tests go here

  describe('Success Cases', () => {
  it('should create user with valid data', () => {
    // This line here defines the POST API endpoint testing.
    return request(app.getHttpServer()) // makes an HTTP request to your App
      .post('/users') // uses POST method to '/users' endpoint
      .send({         // within this set of data
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePassword123!'
      })
      .expect(201)    // expect this particular output
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('John Doe');
      });
  });
});

describe('Validation Failures', () => {
  it('should reject missing email', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        password: 'SecurePassword123!'
      })
      .expect(400);
  });
});

});