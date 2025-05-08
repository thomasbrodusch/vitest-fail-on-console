import consoleError from './index';
import { describe, it, expect } from 'vitest';
describe('console.error allow message true', () => {
    it('does not throw', () => {
        expect(consoleError).not.toThrow();
    });
});
