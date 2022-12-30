import { describe, it, expect } from 'vitest';
import moduleContainingConsoleError from './error';
describe('test with error', () => {
    it('should fail and throw a vitest-fail-on-console error', () => {
        moduleContainingConsoleError();
        expect(1 == 1).toBe(true);
    });
});
