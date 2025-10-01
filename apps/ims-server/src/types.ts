//this file should be inside src directory
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      meta?: { identifierType: "email" | "phone" };
      t?: any;
      user?: { id: string };

      requestContext: {
        ipAddress?: string;
        userAgent: string;
        requestId: string;
      };
    }
  }
}
