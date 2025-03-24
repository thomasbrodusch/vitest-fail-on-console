import { exec } from 'child_process';

describe('vitest-fail-on-console', () => {
    const errorThrownMessage = () =>
        `vitest-fail-on-console > Expected test not to call`;

    const runFixture = async (fixtureName): Promise<{ stderr: string }> => {
        const fixtureDirectory = `./tests/fixtures/${fixtureName}/`;
        const testFilePath = `${fixtureDirectory}/index.spec.ts`;
        const configFilePath = `${fixtureDirectory}/vitest.config.ts`;
        const cmd = `./node_modules/.bin/vitest related ${testFilePath} -c ${configFilePath} --run`;
        return new Promise((resolve) => {
            exec(cmd, (_error, _stdout, stderr) => {
                resolve({ stderr });
            });
        });
    };

    it.each([
        ['throw error', 'console.error() is called', {}, 'error', true],

        [
            'not throw error',
            'console.error() is called',
            { shouldFailOnError: false },
            'error-disabled',
            false,
        ],
        [
            'not throw error',
            'console.error() is called',
            { shouldFailOnError: true, skipTest: '/pattern/' },
            'error-skip-test',
            false,
        ],
        [
            'throw error',
            'console.assert() is called with a failing assertion ',
            { shouldFailOnAssert: true },
            'assert-failure',
            true,
        ],
        [
            'not throw error',
            'console.assert() is called with a passing assertion',
            { shouldFailOnAssert: true },
            'assert-success',
            false,
        ],
        [
            'throw error',
            'console.error() is called in setTimeout()',
            { afterEachDelay: 100 },
            'after-each-delay-failure',
            true,
        ],
        [
            'not throw error',
            'console.error() is called in setTimeout()',
            {},
            'after-each-delay-success',
            false,
        ],
    ])(
        'should %s when %s with options %s',
        async (msgA, msgB, options, fixture, isErrorThrown) => {
            const { stderr } = await runFixture(fixture);
            expect(stderr).toEqual(
                isErrorThrown
                    ? expect.stringContaining(errorThrownMessage())
                    : expect.not.stringContaining(errorThrownMessage())
            );
        }
    );
});
