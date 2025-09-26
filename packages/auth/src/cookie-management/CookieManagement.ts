import { Response, Request as ExpressRequest } from "express";
import { CookieOptions } from "./interfaces/ICookieManagement.js";

/**
 * Base class responsible for all cookie operations
 */

export abstract class CookieManagement {
  protected options: Omit<Required<CookieOptions>, "domain"> & {
    domain?: string;
  };

  constructor(options: CookieOptions, isProduction: boolean) {
    this.options = {
      cookieName: options.cookieName ?? "defaultCookie",
      path: options.path ?? "/",
      httpOnly: options.httpOnly ?? true,
      secure: options.secure ?? isProduction,
      sameSite: options.sameSite ?? (isProduction ? "lax" : "strict"),
      maxAge: options.maxAge ?? 60 * 60 * 24 * 7, // default 7 days
      domain: options.domain,
    };
  }

  /**
   * Create/Set a cookie
   */
  public setCookie(value: string, res: Response): void {
    if (!value) throw new Error("Cookie value is required");

    res.cookie(this.options.cookieName, value, {
      httpOnly: this.options.httpOnly,
      path: this.options.path,
      secure: this.options.secure,
      sameSite: this.options.sameSite,
      maxAge: this.options.maxAge * 1000, // express expects ms
      domain: this.options.domain,
    });
  }

  /**
   * Clear the cookie
   */
  public clearCookie(res: Response): void {
    if (!res) throw new Error("Express response object is required");

    res.clearCookie(this.options.cookieName, {
      httpOnly: this.options.httpOnly,
      path: this.options.path,
      secure: this.options.secure,
      sameSite: this.options.sameSite,
      domain: this.options.domain,
    });
  }

  /**
   * Get the cookie value from request
   */
  public getCookie(
    req: ExpressRequest & { cookies?: { [key: string]: string } }
  ): string | undefined {
    if (!req.cookies) {
      throw new Error(
        "Make sure cookie-parser middleware is enabled in Express"
      );
    }

    return req.cookies[this.options.cookieName];
  }
}
