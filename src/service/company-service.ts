import { Company } from "./../entity/company";
import { SearchCompanyInput } from "../entity/input-types/search-company-input";
import { Service } from "typedi";
import { createQueryBuilder } from "typeorm";
import CompanyUtils from "./../utils/company-utils";
import { City } from "../entity/city";
import { Speciality } from "../entity/speciality";

@Service()
export class CompanyService {
  async getAllCities() {
    return await createQueryBuilder(City, "city").getMany();
  }

  async getAllSpecialities() {
    return await createQueryBuilder(Speciality, "speciality").getMany();
  }

  async searchCompanies(searchCompanyInput: SearchCompanyInput) {
    let companiesQuery = await createQueryBuilder(Company, "company")
      .leftJoinAndSelect("company.city", "city")
      .leftJoinAndSelect("company.speciality", "speciality")
      .where(`company.name IS NOT NULL`);

    if (searchCompanyInput.searchText) {
      let formattedSearchText = searchCompanyInput.searchText
        .replace(/  +/g, " ")
        .replace(/\W+/g, " ");
      formattedSearchText = formattedSearchText.trim().replace(/ /g, " & ");
      console.log("forma 2", formattedSearchText);
      companiesQuery = companiesQuery.andWhere(
        `to_tsvector('simple',company.name) @@ to_tsquery('simple', :companySearchText)`,
        { companySearchText: `${formattedSearchText}:*` }
      );
    }

    if (searchCompanyInput.city) {
      companiesQuery = companiesQuery.andWhere("city.name = :searchCity", {
        searchCity: searchCompanyInput.city,
      });
    }

    if (
      searchCompanyInput.speciality &&
      searchCompanyInput.speciality.length > 0
    ) {
      companiesQuery = CompanyUtils.createSpecialityQuery(
        searchCompanyInput.speciality,
        companiesQuery
      );
    }

    const companyResults = await companiesQuery
      .take(20)
      .orderBy("company.name", "ASC")
      .getMany();

    return companyResults;
  }
}
