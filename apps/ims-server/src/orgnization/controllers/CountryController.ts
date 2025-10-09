// src/users/usersController.ts
import { Controller, Get, Path, Query, Route, Tags } from "tsoa";
import { getCountriesService } from "../services/country.service.js";
import { getFilterdCountryStatesServices } from "../services/state.service.js";

@Tags("region")
@Route("country")
export class CountryController extends Controller {
  @Get()
  public async getCountries(@Query() name?: string) {
    return await getCountriesService({ where: { name } });
  }

  @Get("{countryId}")
  public async getStates(@Path() countryId: number, @Query() name?: string) {
    return await getFilterdCountryStatesServices(countryId, name);
  }
}
