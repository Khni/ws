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
import { createOrgnization } from "../services/createOrgnization.js";
import { Prisma } from "../../../generated/prisma/index.js";
import { OrganizationCreateManyInputSchema } from "../../../generated/zod/index.js";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { getOrganizationFormDataService } from "../services/getFormDataService.js";
import { getFilterdCountryStatesServices } from "../services/state.service.js";
import type {
  OrganizationCreateBody,
  OrganizationCreateInput,
} from "@khaled/ims-shared";
import {
  organizationCreateBodySchema,
  organizationCreateInputSchema,
  organizationWhereInputSchema,
} from "@khaled/ims-shared";
import { OrganizationService } from "../OrganizationService.js";
import { OrganizationError } from "../errors/OrganizationError.js";
import { errorMapper } from "@khaled/error-handler";
import { organizationErrorMapping } from "../errors/organizationErrorsMapping.js";
import { isAuthentecated } from "../../user/middlewares/isAuthenticatedMiddleware.js";

@Tags("organization")
@Route("organization")
export class OrgnizationController extends Controller {
  organizationService = new OrganizationService();
  @Middlewares([
    isAuthentecated,
    validateZodSchemaMiddleware({
      bodySchema: organizationCreateBodySchema,
    }),
  ])
  @Post()
  public async createOrgnization(
    @Body() body: OrganizationCreateBody,
    @Request() req: RequestType
  ) {
    try {
      return await this.organizationService.create({
        data: { ...body, ownerId: req.user!.id },
      });
    } catch (error) {
      if (error instanceof OrganizationError) {
        throw errorMapper(error, organizationErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([isAuthentecated])
  @Get("/owner-organizations")
  public async getOwnedOrganizations(@Request() req: RequestType) {
    return await this.organizationService.findOwnedOrganizations(req.user!.id);
  }
  @Middlewares([isAuthentecated])
  @Get("/user-organizations")
  public async getUserOrganizations(@Request() req: RequestType) {
    return await this.organizationService.findUserOrganizations(req.user!.id);
  }

  @Get("/form-data")
  public async organizationFormData() {
    return await getOrganizationFormDataService();
  }
}
