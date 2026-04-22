import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { AppModule } from './app.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://dev-davidliweishi1998.au.auth0.com', //Enable the Auth0 domain
    ],
    credentials: true,
  });

  //Validation pipe

  app.useGlobalPipes(new ValidationPipe ({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.register(helmet);
  await app.listen(3001);
  console.log('✅ Server running on http://localhost:3001');
}

bootstrap();
