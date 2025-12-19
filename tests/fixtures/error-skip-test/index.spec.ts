import consoleError from './index.js';
import { describe, it, expect } from 'vitest';
describe('console.error skip test', () => {
    it('does not throw', () => {
        expect(consoleError).not.toThrow();
    });
});
