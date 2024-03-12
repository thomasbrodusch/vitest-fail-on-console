import { beforeEach, afterEach, expect } from "vitest";
import * as util from 'util';
import chalk from 'chalk';
import {
    ConsoleCallStacks,
    ConsoleMethod,
    VitestFailOnConsoleFunction,
} from './types';

const LINE_RETURN = '\n';
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
        afterEachDelay = undefined
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
        afterEachDelay: undefined
    }
) => {
    const flushUnexpectedConsoleCalls = (
        methodName: ConsoleMethod,
        unexpectedConsoleCallStacks: ConsoleCallStacks
    ) => {
        if (unexpectedConsoleCallStacks.length) {
            const messages = unexpectedConsoleCallStacks.map(
                ([stack, message]) => {
                    const stackLines = stack.split(LINE_RETURN);
                    return (
                        `${chalk.red(message)}${LINE_RETURN}` +
                        `${stackLines
                            .map((line, index) => {
                                if (index === stackLines.length - 1) {
                                    return chalk.white(line);
                                }
                                return chalk.gray(line);
                            })
                            .join(LINE_RETURN)}`
                    );
                }
            );

            const message = errorMessage(methodName);
            const doubleLineReturn = `${LINE_RETURN}${LINE_RETURN}`;
            throw new Error(
                `${message}${doubleLineReturn}${messages.join(
                    doubleLineReturn
                )}`
            );
        }
    };

    const patchConsoleMethod = (methodName: ConsoleMethod) => {
        const unexpectedConsoleCallStacks: ConsoleCallStacks = [];

        const captureMessage = (format: unknown, ...args) => {
            const message = util.format(format, ...args);
            if (silenceMessage && silenceMessage(message, methodName)) {
                return;
            }

            // Capture the call stack now, so we can warn about it later.
            // The call stack has helpful information for the test author.
            // Don't throw yet though b'c it might be accidentally caught and suppressed.
            const { stack } = new Error();
            if (stack) {
                unexpectedConsoleCallStacks.push([
                    stack.slice(stack.indexOf(LINE_RETURN) + 1),
                    message,
                ]);
            }
        };

        const newAssertMethod = (
            assertion: boolean,
            format: unknown,
            ...args
        ) => {
            if (assertion) {
                return;
            }
            captureMessage(format, ...args);
        };

        const newMethod =
            methodName === ConsoleMethod.Assert
                ? newAssertMethod
                : captureMessage;

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
            unexpectedConsoleCallStacks.length = 0;
        });

        afterEach(async () => {
            if (isTestSkipped()) {
                return;
            }
            if (afterEachDelay) {
                await new Promise(resolve => setTimeout(resolve, afterEachDelay));
            }
            flushUnexpectedConsoleCalls(
                methodName,
                unexpectedConsoleCallStacks
            );
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
