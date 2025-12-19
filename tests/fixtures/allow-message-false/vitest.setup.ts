import vitestFailOnConsole from '../../../src/index.js';

vitestFailOnConsole({
    silenceMessage: (errorMessage) => /allow message/.test(errorMessage),
});
