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
import prisma from "../database/prisma.js";
@Tags("permissions")
@Route("permissions")
export class PermissionController extends Controller {
  @Get("headers")
  public async getPermissionMatrix() {
    const actions = await prisma.action.findMany();
    const resources = await prisma.resource.findMany();
    const permissions = await prisma.permission.findMany();
    return { actions, resources, permissions };
  }
  @Get("{roleId}")
  public async getRolePermissions(@Path() roleId: string) {
    return await prisma.rolePermission.findMany({
      where: {
        roleId,
      },
      select: {
        id: true,
        permissionId: true,
      },
    });
  }
}
