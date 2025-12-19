import vitestFailOnConsole from '../../../src/index.js';

vitestFailOnConsole({
    silenceMessage: (errorMessage) => /silence message/.test(errorMessage),
});
