import {
  Controller,
  Request,
  Route,
  Middlewares,
  Tags,
  Get,
  Body,
  Post,
  Query,
  Path,
} from "tsoa";
import type { Request as RequestType } from "express";
@Tags("role")
@Route("role")
export class RoleController extends Controller {
  @Post()
  public async createRole() {}
}
