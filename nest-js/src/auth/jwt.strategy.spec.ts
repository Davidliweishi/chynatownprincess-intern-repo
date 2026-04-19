import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('test-secret') },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  // ✅ Test 1: Strategy exists
  it('should have validate method', () => {
    expect(strategy.validate).toBeDefined();
  });

  // ✅ Test 2: Validate works with payload
  it('should validate and return result', async () => {
    const payload = { sub: 1, username: 'john' };
    const result = await strategy.validate(payload);
    expect(result).toBeDefined();
  });

  // ✅ Test 3: Validate with minimal payload
  it('should validate minimal payload', async () => {
    const payload = { sub: 1 };
    const result = await strategy.validate(payload);
    expect(result).toBeDefined();
  });
});