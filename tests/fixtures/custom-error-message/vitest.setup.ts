import vitestFailOnConsole from '../../../src/index';
vitestFailOnConsole({
    errorMessage: (methodName, bold) =>
        `CUSTOM_ERROR_MESSAGE: do not call ${bold(`console.${methodName}()`)}`,
});
