// src/users/usersController.ts
import { Controller, Get, Path, Query, Route, Tags } from "tsoa";
import { getCountriesService } from "../services/country.service.js";
import { getFilterdCountryStatesServices } from "../services/state.service.js";
import { getFilterdCountryTimesZonesServices } from "../services/getFilteredTimesZones.js";

@Tags("region")
@Route("country")
export class CountryController extends Controller {
  @Get()
  public async getCountries(@Query() name?: string) {
    return await getCountriesService({ where: { name } });
  }

  @Get("{countryId}/states")
  public async getStates(@Path() countryId: string, @Query() name?: string) {
    return await getFilterdCountryStatesServices(countryId, name);
  }
  @Get("{countryId}/time-zones")
  public async getFilterdTimeZones(@Path() countryId: string) {
    return await getFilterdCountryTimesZonesServices(countryId);
  }
}
