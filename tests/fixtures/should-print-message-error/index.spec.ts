import consoleError from './index.js';
import { describe, it, expect } from 'vitest';
describe('console.error should print message', () => {
    it('does throw', () => {
        expect(consoleError).toThrow();
    });
});
