import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';


export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Vitest-fail-on-console',
            fileName: (format) => `vitest-fail-on-console.${format}.js`,
        },
        rollupOptions: {
            external: ['chalk', 'util', 'vitest'],
            output: {
                globals: {
                    chalk: 'chalk',
                    vitest: 'vitest',
                    util: 'util'
                },
                sourcemap: true,
                exports: 'named',
            },
        },
    },
    plugins: [dts()],
    test: {
        environment: 'node',
        globals: true,
        mockReset: true,
        restoreMocks: true,
    },
});
