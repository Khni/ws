import {
  Body,
  Controller,
  Post,
  Route,
  Tags,
  Middlewares,
  Get,
  Path,
  Query,
} from "tsoa";
import { createOrgnization } from "../services/createOrgnization.js";
import { Prisma } from "../../../generated/prisma/index.js";
import { OrganizationCreateManyInputSchema } from "../../../generated/zod/index.js";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { getOrganizationFormDataService } from "../services/getFormDataService.js";
import { getFilterdCountryStatesServices } from "../services/state.service.js";
import type { OrganizationCreateInput } from "@khaled/ims-shared";
import {
  organizationCreateInputSchema,
  organizationWhereInputSchema,
} from "@khaled/ims-shared";
import { OrganizationService } from "../OrganizationService.js";
import { OrganizationError } from "../errors/OrganizationError.js";
import { errorMapper } from "@khaled/error-handler";
import { organizationErrorMapping } from "../errors/organizationErrorsMapping.js";

@Tags("organization")
@Route("organization")
export class OrgnizationController extends Controller {
  organizationService = new OrganizationService();
  @Middlewares([
    validateZodSchemaMiddleware({
      bodySchema: organizationCreateInputSchema,
    }),
  ])
  @Post()
  public async createOrgnization(@Body() body: OrganizationCreateInput) {
    try {
      return await this.organizationService.create({ data: body });
    } catch (error) {
      if (error instanceof OrganizationError) {
        throw errorMapper(error, organizationErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([
    validateZodSchemaMiddleware({
      querySchema: organizationWhereInputSchema,
    }),
  ])
  @Get()
  public async getOwnedOrganizations(@Query() ownerId?: string) {
    return await this.organizationService.findMany({ where: { ownerId } });
  }

  @Get("/form-data")
  public async organizationFormData() {
    return await getOrganizationFormDataService();
  }
}
