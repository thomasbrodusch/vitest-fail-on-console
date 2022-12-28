import assertFailure from './index';
import { describe, it, expect } from 'vitest';
describe('console.assert failure', () => {
    it('does throw', () => {
        expect(assertFailure).toThrow();
    });
});
