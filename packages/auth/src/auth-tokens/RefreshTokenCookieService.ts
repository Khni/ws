import { CookieManagement } from "../cookie-management/CookieManagement.js";
import {
  CookieOptions,
  ICookieManagement,
} from "../cookie-management/interfaces/ICookieManagement.js";

export class RefreshTokenCookie
  extends CookieManagement
  implements ICookieManagement
{
  constructor(
    private isProduction: boolean,
    private refreshTokenCookieOptions: CookieOptions
  ) {
    super(refreshTokenCookieOptions, isProduction);
  }
}
