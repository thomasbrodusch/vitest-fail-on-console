import vitestFailOnConsole from '../../../src/index';

vitestFailOnConsole({
    silenceMessage: (errorMessage) => /allow message/.test(errorMessage),
});
