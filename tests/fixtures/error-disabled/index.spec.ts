import consoleError from './index.js';
import { describe, it, expect } from 'vitest';
describe('console.error disabled', () => {
    it('does throw', () => {
        expect(consoleError).not.toThrow();
    });
});
