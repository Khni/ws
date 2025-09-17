import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { ILogger } from './ILogger.js';
import { HttpError } from '../../../../../packages/error-handler/src/http-errors/HttpError.js';
export declare class LogError {
    private logger;
    constructor(logger: ILogger);
    logHttpError(error: HttpError): void;
    logPrismaError(error: PrismaClientKnownRequestError): void;
    logZodError(error: ZodError): void;
    logUnExpectedError(error: Error): void;
    private flattenErrorCauses;
}
//# sourceMappingURL=LogError.d.ts.map