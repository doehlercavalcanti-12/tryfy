import { describe, it, expect } from 'vitest';
import { locales, messages, platformUrls } from '../src/index';

describe('shared package', () => {
  it('exposes locales', () => {
    expect(locales).toContain('en');
    expect(messages.en['home.title']).toBeDefined();
  });

  it('documents primary and secondary domains', () => {
    expect(platformUrls.domains.primary).toBe('tryfy.fun');
    expect(platformUrls.domains.secondary).toBe('tryfy.online');
    expect(platformUrls.auth.deviceVerification.primary).toContain('tryfy.fun');
    expect(platformUrls.auth.deviceVerification.secondary).toContain('tryfy.online');
  });
});
