import { beforeEach, afterEach, expect } from 'vitest';
import * as util from 'util';
import chalk from 'chalk';
import { ConsoleMethod, VitestFailOnConsoleFunction } from './types';

const defaultErrorMessage = (methodName: ConsoleMethod) =>
    `vitest-fail-on-console > Expected test not to call ${chalk.bold(
        `console.${methodName}()`
    )}.
    If the ${methodName} is expected, test for it explicitly by mocking it out using: 
    ${chalk.bold(
        `vi.spyOn(console, '${methodName}').mockImplementation(() => {}) `
    )}
    and test that the warning occurs.`;

const init = (
    {
        errorMessage = defaultErrorMessage,
        shouldFailOnAssert = false,
        shouldFailOnDebug = false,
        shouldFailOnError = true,
        shouldFailOnInfo = false,
        shouldFailOnLog = false,
        shouldFailOnWarn = true,
        skipTest = undefined,
        silenceMessage = undefined,
        afterEachDelay = undefined,
    }: VitestFailOnConsoleFunction = {
        errorMessage: defaultErrorMessage,
        shouldFailOnAssert: false,
        shouldFailOnDebug: false,
        shouldFailOnError: true,
        shouldFailOnInfo: false,
        shouldFailOnLog: false,
        shouldFailOnWarn: true,
        silenceMessage: undefined,
        skipTest: undefined,
        afterEachDelay: undefined,
    }
) => {
    const flushUnexpectedConsoleCalls = (methodName: ConsoleMethod) => {
        throw new Error(errorMessage(methodName));
    };

    const patchConsoleMethod = (methodName: ConsoleMethod) => {
        let hadConsoleCall = false;

        const handleConsoleCall = (format: unknown, ...args) => {
            const message = util.format(format, ...args);
            if (silenceMessage && silenceMessage(message, methodName)) {
                return;
            }

            hadConsoleCall = true;
            originalMethod(message);
        };

        const newAssertMethod = (
            assertion: boolean,
            format: unknown,
            ...args
        ) => {
            if (assertion) {
                return;
            }
            handleConsoleCall(format, ...args);
        };

        const newMethod =
            methodName === ConsoleMethod.Assert
                ? newAssertMethod
                : handleConsoleCall;

        const originalMethod = console[methodName];

        const isTestSkipped = (): boolean => {
            const currentTestState = expect.getState();
            const testName = currentTestState.currentTestName;
            const testPath = currentTestState.testPath;
            return !!skipTest?.({ testName, testPath });
        };

        beforeEach(() => {
            if (isTestSkipped()) {
                return;
            }
            console[methodName] = newMethod; // eslint-disable-line no-console
            hadConsoleCall = false;
        });

        afterEach(async () => {
            if (isTestSkipped()) {
                return;
            }
            if (afterEachDelay) {
                await new Promise((resolve) =>
                    setTimeout(resolve, afterEachDelay)
                );
            }
            if (hadConsoleCall) {
                flushUnexpectedConsoleCalls(methodName);
            }
            console[methodName] = originalMethod;
        });
    };

    [
        [shouldFailOnAssert, ConsoleMethod.Assert],
        [shouldFailOnDebug, ConsoleMethod.Debug],
        [shouldFailOnError, ConsoleMethod.Error],
        [shouldFailOnInfo, ConsoleMethod.Info],
        [shouldFailOnLog, ConsoleMethod.Log],
        [shouldFailOnWarn, ConsoleMethod.Warn],
    ].forEach(([condition, methodName]: [boolean, ConsoleMethod]) => {
        if (condition) {
            patchConsoleMethod(methodName);
        }
    });
};

export default init;
