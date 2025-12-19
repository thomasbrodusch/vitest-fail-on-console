import consoleError from './index.js';
import { describe, it, expect } from 'vitest';
describe('console.error with timeout', () => {
    it('does throw', () => {
        expect(consoleError).toThrow();
    });
});
