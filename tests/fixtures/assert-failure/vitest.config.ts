import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./tests/fixtures/assert-failure/vitest.setup.ts'],
    },
});
