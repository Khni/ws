import { Body, Controller, Post, Route, Tags } from "tsoa";
import { createOrgnization } from "../services/createOrgnization.js";
import { Prisma } from "../../../generated/prisma/index.js";
import { OrganizationCreateManyInputSchema } from "../../../prisma/generated/zod/index.js";

@Tags("organization")
@Route("organization")
export class OrgnizationController extends Controller {
  @Post()
  public async createOrgnization(
    @Body() body: Prisma.OrganizationCreateManyInput
  ) {
    const data = OrganizationCreateManyInputSchema.parse(body);
    return await createOrgnization(data);
  }
}
