// src/auth/auth.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DualAuthGuard } from './guards/dual-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ============ CUSTOM JWT ENDPOINTS ============

  @Public()
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials.email, credentials.password);
  }

  @Public()
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refreshAccessToken(body.refresh_token);
  }

  // ============ AUTH0 ENDPOINTS ============

@Public()
@Get('auth0/login')
async auth0Login(@Res() res: FastifyReply) {
  try {
    console.log('=== AUTH0 LOGIN CALLED ===');
    
    if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID) {
      console.error('Missing AUTH0 env vars');
      return res.status(400).send('Missing AUTH0 configuration');
    }

    const authUrl = new URL(`https://${process.env.AUTH0_DOMAIN}/authorize`);
    authUrl.searchParams.append('client_id', process.env.AUTH0_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', `${process.env.AUTH0_BASE_URL}/auth/auth0/callback`);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', process.env.AUTH0_SCOPE || 'openid profile email');
    authUrl.searchParams.append('state', 'test-state-123');
    
    const fullUrl = authUrl.toString();
    console.log('Redirecting to:', fullUrl);
    
    // Fastify way: set header directly
    res.header('Location', fullUrl);
    res.status(302);
    res.send();
  } catch (error) {
    console.error('Auth0 login error:', error);
    res.status(500).send('Internal server error');
  }
}

  // ============ CALLBACK ENDPOINTS =========

@Public()
@Get('auth0/callback')
async auth0Callback(@Request() req: any, @Res() res: FastifyReply) {  // ← Change Response to FastifyReply
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).send('Missing authorization code');  // ← Use .send() instead of .json()
    }

    console.log('Auth0 callback received with code:', code);

    // Exchange authorization code for tokens
    const tokenResponse = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.AUTH0_BASE_URL}/auth/auth0/callback`,
        }),
      },
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokens);
      return res.status(400).send(JSON.stringify({ error: 'Failed to exchange code for tokens' }));
    }

    console.log('Successfully exchanged code for tokens');

    // Redirect to frontend with tokens
    const frontendUrl = new URL('http://localhost:3000');
    frontendUrl.searchParams.append('access_token', tokens.access_token);
    frontendUrl.searchParams.append('id_token', tokens.id_token);
    if (tokens.refresh_token) {
      frontendUrl.searchParams.append('refresh_token', tokens.refresh_token);
    }

    res.redirect(frontendUrl.toString());
  } catch (error) {
    console.error('Auth0 callback error:', error);
    res.status(500).send('Auth0 callback failed');
  }
}

  // ============ PROTECTED ENDPOINTS (BOTH AUTH WORK) ============

  @UseGuards(DualAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return {
      message: 'User profile',
      source: req.user.source,
      user: req.user,
    };
  }
}
