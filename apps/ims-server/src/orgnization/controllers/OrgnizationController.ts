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

@Tags("organization")
@Route("organization")
export class OrgnizationController extends Controller {
  @Middlewares([
    validateZodSchemaMiddleware({
      bodySchema: OrganizationCreateManyInputSchema,
    }),
  ])
  @Post()
  public async createOrgnization(
    @Body() body: Prisma.OrganizationCreateManyInput
  ) {
    return await createOrgnization(body);
  }

  @Get("/form-data")
  public async organizationFormData() {
    return await getOrganizationFormDataService();
  }
}
