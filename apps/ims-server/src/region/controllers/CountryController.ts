// src/users/usersController.ts
import { Controller, Get, Path, Query, Route, Tags } from "tsoa";
import { getCountriesService } from "../services/country.service.js";
import { getCountryStatesServices } from "../services/state.service.js";

@Tags("region")
@Route("country")
export class CountryController extends Controller {
  @Get()
  public async getCountries(@Query() name?: string) {
    return await getCountriesService({ where: { name } });
  }

  @Get("{countryId}")
  public async getStates(@Path() countryId: number, @Query() name?: string) {
    return await getCountryStatesServices(countryId, name);
  }
}
