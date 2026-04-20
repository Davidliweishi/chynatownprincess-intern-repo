import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // For testing purposes: accept any email/password
    // In production, you would:
    // 1. Find user by email
    // 2. Compare hashed password
    // 3. Return error if not found or password wrong
    
    const user = {
      id: 1,
      email: email,
      roles: ['admin', 'user'], // Give both roles for testing all endpoints
    };

    //Generate JWT tokens on login
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });

    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }
}