import { NextFunction, Request, Response } from 'express'
import { Schema } from 'zod'

const validateSchemaMiddleware =
	(schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			})
			next()
		} catch (err: any) {
			throw err
		}
	}

export default validateSchemaMiddleware
