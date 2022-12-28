import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        setupFiles: ['./tests/fixtures/assert-failure/vitest.setup.ts'],
    },
});
