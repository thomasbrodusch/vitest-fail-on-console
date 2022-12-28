import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        setupFiles: ['./tests/fixtures/error-skip-test/vitest.setup.ts'],
    },
});
