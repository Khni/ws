import { AuthError, authErrorMapping } from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";
import { NextFunction, Request, Response } from "express";
import container from "../../container.js";

export function isAuthentecated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const accessTokenService = container.resolve("accessTokenService");

  try {
    const payload = accessTokenService.verify(token);

    req.user = {
      ...(req.user || {}),
      id: payload.userId,
    };
    next();
  } catch (error) {
    if (error instanceof AuthError) {
      throw errorMapper(error, authErrorMapping);
    }

    throw error;
  }
}
