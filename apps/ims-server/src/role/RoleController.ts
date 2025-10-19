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
  Put,
} from "tsoa";
import type { Request as RequestType } from "express";
import {
  roleCreateBodySchema,
  type RoleUpdateBody,
  roleUpdateBodySchema,
  type RoleCreateBody,
} from "@khaled/ims-shared";
import { RoleService } from "./RoleService.js";
import { isAuthentecated } from "../user/middlewares/isAuthenticatedMiddleware.js";
import { validateZodSchemaMiddleware } from "../core/schema/validateZodErrorMiddleware.js";
import { RoleError } from "./errors/RoleError.js";
import { errorMapper } from "@khaled/error-handler";
import { roleErrorMapping } from "./errors/RoleErrorsMapping.js";
@Tags("role")
@Route("role")
export class RoleController extends Controller {
  roleService = new RoleService();
  @Middlewares([
    isAuthentecated,
    validateZodSchemaMiddleware({
      bodySchema: roleCreateBodySchema,
    }),
  ])
  @Post()
  public async createRole(
    @Body() body: RoleCreateBody,
    @Request() req: RequestType
  ) {
    try {
      const { permissions, ...rest } = body;
      return await this.roleService.create({
        data: { ...rest, createdById: req.user?.id! },
        rolePermissionsData: permissions,
      });
    } catch (error) {
      if (error instanceof RoleError) {
        throw errorMapper(error, roleErrorMapping);
      }

      throw error;
    }
  }

  // PUT /role/:id
  // <WIP> later it will be validated roles of user .. is user authorized to perform this action on this resource?
  @Middlewares([
    isAuthentecated,
    validateZodSchemaMiddleware({
      bodySchema: roleUpdateBodySchema,
    }),
  ])
  @Put("/{id}")
  public async updateRole(@Body() body: RoleUpdateBody, @Path() id: string) {
    try {
      const { permissions, ...rest } = body;
      return await this.roleService.update({
        data: { ...rest },
        rolePermissionsData: permissions,
        id,
      });
    } catch (error) {
      if (error instanceof RoleError) {
        throw errorMapper(error, roleErrorMapping);
      }

      throw error;
    }
  }
}
