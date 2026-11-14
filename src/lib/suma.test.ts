import { describe, expect, it } from 'vitest';
import { suma } from './suma';

describe('suma', () => {
  it('suma dos números', () => {
    expect(suma(1, 2)).toBe(3);
  });
});
