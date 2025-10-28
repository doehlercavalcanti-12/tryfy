import { describe, it, expect } from 'vitest';
import { moderationRules } from '../src/index';

describe('moderation rules', () => {
  it('has at least one rule', () => {
    expect(moderationRules.length).toBeGreaterThan(0);
  });
});
