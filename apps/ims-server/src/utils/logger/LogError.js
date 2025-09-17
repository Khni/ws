export class LogError {
    constructor(logger) {
        this.logger = logger;
    }
    logHttpError(error) {
        const fullErrorChain = this.flattenErrorCauses(error);
        this.logger[error.logLevel]('HttpError', {
            topLevel: {
                name: error.name,
                message: error.message,
                code: error.code,
                logLevel: error.logLevel,
                responseMessage: error.responseMessage,
                meta: error.meta,
                stack: error.stack,
            },
            causeChain: fullErrorChain,
        });
    }
    logPrismaError(error) {
        this.logger.error('PrismaClientKnownRequestError', {
            topLevel: {
                name: error.name,
                message: error.message,
                code: error.code,
                meta: error.meta,
                stack: error.stack,
            },
        });
    }
    logZodError(error) {
        const serializedIssues = error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
            code: issue.code,
        }));
        this.logger.warn('ZodError', {
            issues: serializedIssues,
        });
    }
    logUnExpectedError(error) {
        const fullErrorChain = this.flattenErrorCauses(error);
        this.logger.error('UnExpectedError', {
            topLevel: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            causeChain: fullErrorChain,
        });
    }
    flattenErrorCauses(error) {
        const result = [];
        let current = error;
        while (current instanceof Error && current.cause) {
            current = current.cause;
            if (current instanceof Error) {
                const causeInfo = {
                    name: current.name,
                    message: current.message,
                    stack: current.stack,
                };
                // Copy other useful fields if present (code, responseMessage, etc.)
                if ('code' in current)
                    causeInfo.code = current.code;
                if ('responseMessage' in current)
                    causeInfo.responseMessage = current.responseMessage;
                if ('meta' in current)
                    causeInfo.meta = current.meta;
                result.push(causeInfo);
            }
        }
        return result;
    }
}
