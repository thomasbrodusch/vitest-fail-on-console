import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./tests/fixtures/should-print-message-no-error/vitest.setup.ts'],
    },
});
