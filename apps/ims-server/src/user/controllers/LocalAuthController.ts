import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Request,
} from "tsoa";
import { LocalAuth } from "../services/LocalAuthService.js";
import type { Request as ExpressRequestType, Response } from "express";
@Tags("Authentication")
@Route("auth")
export class AuthController extends Controller {
  private localAuthService: LocalAuth;

  constructor() {
    super();
    this.localAuthService = new LocalAuth();
  }

  @Post("register")
  @SuccessResponse("201", "Created")
  public async register(
    @Body()
    body: {
      password: string;
      identifier: string;
      firstName: string;
      lastName: string;
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const result = await this.localAuthService.register({
        ...body,
        identifierType: "email",
      });
      return result;
    } catch (error) {
      console.error(error, "error");
      return "error";
    }
  }
}
