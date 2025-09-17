import { ILogger } from './ILogger.js'

// import logger from "@/core/logger/winston-logger";
const logger = console

export class WinstonLogger implements ILogger {
	error(message: string, meta?: any): void {
		logger.error(message, meta)
	}
	warn(message: string, meta?: any): void {
		logger.warn(message, meta)
	}
	info(message: string, meta?: any): void {
		logger.info(message, meta)
	}
	debug(message: string, meta?: any): void {
		logger.debug(message, meta)
	}
}
