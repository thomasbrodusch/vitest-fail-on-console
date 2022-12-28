import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        setupFiles: ['./tests/fixtures/error-disabled/vitest.setup.ts'],
    },
});
