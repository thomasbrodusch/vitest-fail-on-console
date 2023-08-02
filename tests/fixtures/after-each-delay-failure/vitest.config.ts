import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: [
            './tests/fixtures/after-each-delay-failure/vitest.setup.ts',
        ],
    },
});
