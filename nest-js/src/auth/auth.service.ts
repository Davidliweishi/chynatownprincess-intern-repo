// src/auth/auth.service.ts
//NOTE: this is only a template
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  // Token blacklist for logout (in production, use Redis or database)
  private tokenBlacklist = new Set<string>();

  // Session storage (in production, use database or Redis)
  private sessions = new Map<string, {
    userId: string;
    email: string;
    refreshToken: string;
    createdAt: Date;
    expiresAt: Date;
  }>();

  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // For testing purposes: accept any email/password
    // In production, you would:
    // 1. Find user by email
    // 2. Compare hashed password
    // 3. Return error if not found or password wrong
    
    const user = {
      id: '1',
      email: email,
      roles: ['admin', 'user'],
    };

    // Generate short-lived access token (1 hour)
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        roles: user.roles,
        type: 'access',
      },
      { expiresIn: '1h' }
    );

    // Generate long-lived refresh token (30 days)
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        type: 'refresh',
      },
      { expiresIn: '30d' }
    );

    // Create session
    const sessionId = this.generateSessionId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    this.sessions.set(sessionId, {
      userId: user.id,
      email: user.email,
      refreshToken,
      createdAt: new Date(),
      expiresAt,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour in seconds
      session_id: sessionId,
    };
  }

  async register(userData: CreateUserDto) {
    // For testing purposes: create user without database
    // In production, you would:
    // 1. Check if user already exists
    // 2. Hash password with bcrypt
    // 3. Save user to database
    
    const newUser = {
      id: Math.random().toString(),
      email: userData.email,
      name: userData.name,
      roles: ['user'],
    };

    // Generate tokens
    const accessToken = this.jwtService.sign(
      {
        sub: newUser.id,
        email: newUser.email,
        roles: newUser.roles,
        type: 'access',
      },
      { expiresIn: '1h' }
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: newUser.id,
        type: 'refresh',
      },
      { expiresIn: '30d' }
    );

    // Create session
    const sessionId = this.generateSessionId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    this.sessions.set(sessionId, {
      userId: newUser.id,
      email: newUser.email,
      refreshToken,
      createdAt: new Date(),
      expiresAt,
    });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 3600,
      session_id: sessionId,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // Verify refresh token signature and expiration
      const decoded = this.jwtService.verify(refreshToken);

      // Check if token is blacklisted
      if (this.tokenBlacklist.has(refreshToken)) {
        throw new UnauthorizedException('Refresh token has been revoked');
      }

      // Check if session exists
      let session = null;
      for (const [sessionId, sess] of this.sessions.entries()) {
        if (sess.refreshToken === refreshToken) {
          session = { id: sessionId, ...sess };
          break;
        }
      }

      if (!session) {
        throw new UnauthorizedException('Session not found');
      }

      // Check if session is expired
      if (new Date() > session.expiresAt) {
        this.sessions.delete(session.id);
        throw new UnauthorizedException('Session expired. Please login again.');
      }

      // Generate new access token
      const newAccessToken = this.jwtService.sign(
        {
          sub: decoded.sub,
          email: session.email,
          type: 'access',
        },
        { expiresIn: '1h' }
      );

      return {
        access_token: newAccessToken,
        token_type: 'Bearer',
        expires_in: 3600,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired refresh token. Please login again.',
      );
    }
  }

  async logout(refreshToken: string) {
    try {
      // Verify refresh token
      this.jwtService.verify(refreshToken);

      // Add to blacklist
      this.tokenBlacklist.add(refreshToken);

      // Remove session
      for (const [sessionId, session] of this.sessions.entries()) {
        if (session.refreshToken === refreshToken) {
          this.sessions.delete(sessionId);
          break;
        }
      }

      return {
        message: 'Successfully logged out',
        success: true,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateAccessToken(accessToken: string): Promise<any> {
    try {
      // Check if access token is blacklisted
      if (this.tokenBlacklist.has(accessToken)) {
        throw new UnauthorizedException('Access token has been revoked');
      }

      // Verify and return decoded token
      const decoded = this.jwtService.verify(accessToken);
      
      // Ensure it's an access token, not a refresh token
      if (decoded.type !== 'access') {
        throw new UnauthorizedException('Invalid token type');
      }

      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  // Helper method to generate unique session IDs
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get session info (for debugging/testing)
  getSessionInfo(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }

    return {
      sessionId,
      userId: session.userId,
      email: session.email,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      isExpired: new Date() > session.expiresAt,
      daysRemaining: Math.ceil(
        (session.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ),
    };
  }

  // List all active sessions (for debugging/testing)
  getAllSessions() {
    const activeSessions = [];
    for (const [sessionId, session] of this.sessions.entries()) {
      activeSessions.push({
        sessionId,
        userId: session.userId,
        email: session.email,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
        isExpired: new Date() > session.expiresAt,
      });
    }
    return activeSessions;
  }

  // Invalidate all sessions for a user (useful for security)
  invalidateUserSessions(userId: string) {
    let invalidatedCount = 0;
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.userId === userId) {
        this.tokenBlacklist.add(session.refreshToken);
        this.sessions.delete(sessionId);
        invalidatedCount++;
      }
    }
    return {
      message: `Invalidated ${invalidatedCount} session(s)`,
      count: invalidatedCount,
    };
  }
}