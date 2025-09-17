//this file should be inside src directory
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      t?: any;
      user?: { id: string; email: string };

      requestContext: {
        ipAddress?: string;
        userAgent: string;
        requestId: string;
      };
    }
  }
}
