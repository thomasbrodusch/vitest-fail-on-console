import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error disabled', () => {
    it('does throw', () => {
        expect(consoleError).not.toThrow();
    });
});
