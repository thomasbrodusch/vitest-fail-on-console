import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error', () => {
    it('does throw', () => {
        expect(consoleError).toThrow();
    });
});
