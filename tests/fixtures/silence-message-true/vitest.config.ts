import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./tests/fixtures/silence-message-true/vitest.setup.ts'],
    },
});
