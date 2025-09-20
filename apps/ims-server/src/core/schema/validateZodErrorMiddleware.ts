import { InputValidationError } from "@khaled/error-handler";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { zodErrorSerializer } from "./ZodErrorSerializer.js";

export const validateZodSchemaMiddleware =
  (bodySchema: z.ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Will throw if invalid

      const parsed = bodySchema.parse(req.body);
      req.meta = parsed.meta;
      req.body = parsed; // override with transformed data

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new InputValidationError(err, zodErrorSerializer);
      }
      next(err); // unknown error, pass along
    }
  };
