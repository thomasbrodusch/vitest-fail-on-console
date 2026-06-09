import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error custom error message', () => {
    it('does throw', () => {
        expect(consoleError).toThrow();
    });
});
