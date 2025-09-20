import { InputValidationError } from "@khaled/error-handler";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { zodErrorSerializer } from "./ZodErrorSerializer.js";

export const validateZodErrorMiddleware =
  (schema: z.ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Will throw if invalid
      const parsed = schema.parse(req.body);
      req.body = parsed; // override with transformed data
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // 🚀 throw your standardized error right here
        throw new InputValidationError(err, zodErrorSerializer);
      }
      next(err); // unknown error, pass along
    }
  };
