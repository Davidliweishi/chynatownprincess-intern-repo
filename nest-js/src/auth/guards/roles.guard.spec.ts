import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesGuard,
        { provide: Reflector, useValue: { get: jest.fn() } },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should allow access when no roles are required', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { id: 1, role: 'user' } }),
      }),
      getHandler: () => ({}),
    } as ExecutionContext;

    jest.spyOn(reflector, 'get').mockReturnValue(undefined);
    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should allow access when user has required role', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { id: 1, role: 'admin' } }),
      }),
      getHandler: () => ({}),
    } as ExecutionContext;

    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should deny access when user lacks required role', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { id: 1, role: 'user' } }),
      }),
      getHandler: () => ({}),
    } as ExecutionContext;

    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
    expect(guard.canActivate(mockContext)).toBe(false);
  });

  it('should deny access when user is not present', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
      getHandler: () => ({}),
    } as ExecutionContext;

    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
    expect(guard.canActivate(mockContext)).toBe(false);
  });

  it('should allow access when user has one of multiple required roles', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { id: 1, role: 'moderator' } }),
      }),
      getHandler: () => ({}),
    } as ExecutionContext;

    jest.spyOn(reflector, 'get').mockReturnValue(['admin', 'moderator', 'user']);
    expect(guard.canActivate(mockContext)).toBe(true);
  });
});