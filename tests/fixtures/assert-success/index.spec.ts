import assertSuccess from './index';
import { describe, it, expect } from 'vitest';
describe('console.assert success', () => {
    it('does not throw', () => {
        expect(assertSuccess).not.toThrow();
    });
});
