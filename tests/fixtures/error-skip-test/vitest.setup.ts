import vitestFailOnConsole from '../../../src/index.js';
vitestFailOnConsole({
    shouldFailOnError: true,
    skipTest: ({ testPath }) =>
        /.*tests\/fixtures\/error-skip-test\/index.spec.ts/.test(testPath),
});
