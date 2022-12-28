import vitestFailOnConsole from '../../../src/index';
vitestFailOnConsole({
    shouldFailOnError: true,
    skipTest: ({ testPath }) =>
        /.*tests\/fixtures\/error-skip-test\/index.spec.ts/.test(testPath),
});
