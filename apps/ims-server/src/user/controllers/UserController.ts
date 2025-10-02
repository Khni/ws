import { Controller, Request, Route, Middlewares, Tags, Get } from "tsoa";
import type { Request as RequestType } from "express";
import { UserService } from "../services/UserService.js";
import { isAuthentecated } from "../middlewares/isAuthenticatedMiddleware.js";
import { UserResponseType } from "@khaled/ims-shared";

@Tags("user")
@Route("user")
export class UserController extends Controller {
  private userService = new UserService();
  constructor() {
    super();
    this.userService = new UserService();
  }
  @Middlewares([isAuthentecated])
  @Get()
  public async getProfile(
    @Request() req: RequestType
  ): Promise<UserResponseType> {
    // At this point, `req.user` is guaranteed to be populated with the authenticated user's data
    // because the `isAuthentecated` middleware has already validated the token
    // and attached the user object to the request. The non-null assertion `!` is safe here
    // since unauthenticated requests would never reach this method.
    const user = await this.userService.findById({ id: req.user!.id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
