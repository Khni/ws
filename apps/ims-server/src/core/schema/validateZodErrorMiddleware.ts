import { InputValidationError } from "@khaled/error-handler";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { zodErrorSerializer } from "./ZodErrorSerializer.js";

export const validateZodSchemaMiddleware =
  ({
    bodySchema,
    paramsSchema,
    querySchema,
  }: {
    bodySchema?: z.ZodSchema<any>;
    paramsSchema?: z.ZodSchema<any>;
    querySchema?: z.ZodSchema<any>;
  }) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Will throw if invalid

      const parsed = bodySchema?.parse(req.body);
      req.body = parsed; // override with transformed data

      const parsedParams = paramsSchema?.parse(req.params);
      req.params = parsedParams; // override with transformed data

      const parsedQuery = querySchema?.parse(req.query);

      // if meta is present, add it to req.meta
      if (parsed && (parsed as any).meta) req.meta = parsed.meta;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new InputValidationError(err, zodErrorSerializer);
      }
      next(err); // unknown error, pass along
    }
  };
