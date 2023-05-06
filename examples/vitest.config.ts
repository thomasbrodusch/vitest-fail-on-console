import { defineConfig } from 'vitest/config';
export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    test: {
        environment: 'node',
        mockReset: true,
        restoreMocks: true,
        setupFiles: ['./support.ts'],
    },
});
