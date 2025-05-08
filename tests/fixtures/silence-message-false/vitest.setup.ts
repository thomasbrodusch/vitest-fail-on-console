import vitestFailOnConsole from '../../../src/index';

vitestFailOnConsole({
    silenceMessage: (errorMessage) => /silence message/.test(errorMessage),
});
