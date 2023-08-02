import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error with timeout', () => {
    it('does not throw', () => {
        expect(consoleError).not.toThrow();
    });
});
