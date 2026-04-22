// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? {
            // ✅ TESTING: Use SQLite in-memory database (no setup needed!)
            type: 'sqlite',
            database: ':memory:',
            entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
            synchronize: true,
            logging: false,
            dropSchema: true,
          }
        : {
            // Production/Development: Use PostgreSQL
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'dev_db',
            entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
            synchronize: process.env.NODE_ENV === 'development',
            logging: process.env.NODE_ENV === 'development',
            retryAttempts: 5,
            retryDelay: 3000,
          }
    ),
    
    UsersModule,
    
    AuthModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})

export class AppModule {}