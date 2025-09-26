import { Response, Request as ExpressRequest } from "express";

export interface CookieOptions {
  cookieName?: string;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number; // in seconds
  domain?: string;
}

export interface ICookieManagement {
  setCookie(value: string, res: Response<any, Record<string, any>>): void;
  clearCookie(res: Response<any, Record<string, any>>): void;
  getCookie(
    req: ExpressRequest & { cookies?: { [key: string]: string } }
  ): string | undefined;
}
