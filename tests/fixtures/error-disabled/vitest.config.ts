import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./tests/fixtures/error-disabled/vitest.setup.ts'],
    },
});
