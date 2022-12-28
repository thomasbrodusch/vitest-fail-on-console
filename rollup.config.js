import typescript from "@rollup/plugin-typescript";
import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";

const outputOptions = {
    sourcemap: true,
    exports: "named",
    banner: `/*
   * Vitest-fail-on-console 
   * port of famous jest-fail-on-console to Vitest
   * https://github.com/thomasbrodusch/vitest-fail-on-console
   * (c) Thomas Brodusch <brodusch.thomas@gmail.com>
   */`,
};

const config = [
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild()],
        output: [
            {
                dir: `dist/cjs`,
                format: "cjs",
                ...outputOptions,
            },
            {
                dir: `dist/esm`,
                format: "es",
                ...outputOptions,
            },
        ],
    },
    {
        input: `src/index.ts`,
        plugins: [dts()],
        output: {
            file: `dist/vitest-fail-on-console.d.ts`,
            format: "es",
        },
    },
];

export default config;
