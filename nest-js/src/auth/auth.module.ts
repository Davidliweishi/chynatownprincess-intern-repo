// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Auth0Strategy } from './strategies/auth0.strategy';
import { Auth0JwtStrategy } from './strategies/auth0-jwt.strategy';
import { DualAuthGuard } from './guards/dual-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    Auth0Strategy,
    Auth0JwtStrategy,
    DualAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, DualAuthGuard],
})
export class AuthModule {}