type SkipTestFunction = ({
    testName,
    testPath,
}: {
    testName?: string;
    testPath?: string;
}) => boolean;

type ErrorMessageFunction = (methodName: ConsoleMethod) => string;

type SilenceMessageFunction = (
    message: string,
    methodName: ConsoleMethod
) => boolean;

export enum ConsoleMethod {
    Assert = 'assert',
    Debug = 'debug',
    Error = 'error',
    Info = 'info',
    Log = 'log',
    Warn = 'warn',
}

export type VitestFailOnConsoleFunction = {
    shouldFailOnAssert?: boolean;
    shouldFailOnDebug?: boolean;
    shouldFailOnError?: boolean;
    shouldFailOnInfo?: boolean;
    shouldFailOnLog?: boolean;
    shouldFailOnWarn?: boolean;
    skipTest?: SkipTestFunction;
    errorMessage?: ErrorMessageFunction;
    silenceMessage?: SilenceMessageFunction;
    afterEachDelay?: number;
};
