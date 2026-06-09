import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./tests/fixtures/custom-error-message/vitest.setup.ts'],
    },
});
