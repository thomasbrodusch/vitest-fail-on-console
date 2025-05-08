import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error allow message false', () => {
    it('does throw', () => {
        expect(consoleError).toThrow();
    });
});
