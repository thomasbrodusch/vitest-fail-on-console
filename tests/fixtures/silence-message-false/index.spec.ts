import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error silence message false', () => {
    it('does throw', () => {
        expect(consoleError).toThrow();
    });
});
