// src/auth/strategies/auth0.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-auth0';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: `${process.env.AUTH0_BASE_URL}/auth/auth0/callback`,
      scope: process.env.AUTH0_SCOPE || 'openid profile email',
      state: false,
    } as StrategyOptions);
  }

  validate(accessToken: string, refreshToken: string, extraParams: any, profile: any, done: Function) {
    return done(null, {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value,
      picture: profile.picture,
      nickname: profile.nickname,
    });
  }
}