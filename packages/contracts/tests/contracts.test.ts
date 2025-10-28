import { describe, it, expect } from 'vitest';
import { deviceCodeSchema } from '../src/index';

describe('contracts package', () => {
  it('parses device code payload', () => {
    const parsed = deviceCodeSchema.parse({
      userCode: 'ABC123',
      deviceCode: 'device-123',
      verificationUri: 'https://example.com',
      expiresIn: 300
    });
    expect(parsed.userCode).toBe('ABC123');
  });
});
