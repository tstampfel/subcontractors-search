import { Company } from "../entity/company";
import { SearchCompanyInput } from "../entity/input-types/search-company-input";
import { CompanyService } from "../service/company-service";
import { Resolver, Query, Arg } from "type-graphql";
import { City } from "../entity/city";
import { Speciality } from "../entity/speciality";

@Resolver()
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query(() => [City])
  async getAllCities() {
    return await this.companyService.getAllCities();
  }

  @Query(() => [Speciality])
  async getAllSpecialities() {
    return await this.companyService.getAllSpecialities();
  }

  @Query(() => [Company])
  async searchCompany(@Arg("searchCompanyInput") searchCompanyInput: SearchCompanyInput) {
    return await this.companyService.searchCompanies(searchCompanyInput);
  }
}
