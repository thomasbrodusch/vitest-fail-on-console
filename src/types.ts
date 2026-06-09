type SkipTestFunction = ({
    testName,
    testPath,
}: {
    testName?: string;
    testPath?: string;
}) => boolean;

export type ErrorMessageFunction = (methodName: ConsoleMethod, bold: (text: string) => string) => string;

type AllowMessageFunction = (
    message: string,
    methodName: ConsoleMethod
) => boolean;

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

export type ConsoleCallStacks = [string, string][];

export type VitestFailOnConsoleFunction = {
    shouldFailOnAssert?: boolean;
    shouldFailOnDebug?: boolean;
    shouldFailOnError?: boolean;
    shouldFailOnInfo?: boolean;
    shouldFailOnLog?: boolean;
    shouldFailOnWarn?: boolean;
    skipTest?: SkipTestFunction;
    errorMessage?: ErrorMessageFunction;
    allowMessage?: AllowMessageFunction;
    silenceMessage?: SilenceMessageFunction;
    afterEachDelay?: number;
    shouldPrintMessage?: boolean;
};
