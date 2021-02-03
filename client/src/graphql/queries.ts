import { gql } from "@apollo/client";

export function GET_ALL_SPECIALITIES() {
  return gql`
    query {
      getAllSpecialities {
        name
      }
    }
  `;
}

export function GET_ALL_CITIES() {
  return gql`
    query {
      getAllCities {
        name
      }
    }
  `;
}

export function SEARCH_SUBCONTRACTORS(
  searchText: string = "",
  selectedSpecialities: string[] = [],
  selectedCity: string = ""
) {
  return gql`
    query {
      searchCompany(
        searchCompanyInput: {
          searchText: "${searchText}"
          speciality: ${JSON.stringify(selectedSpecialities)}
          city: "${selectedCity}"
        }
      ) {
        name
        city {
          name
        }
        speciality {
          name
        }
      }
    }
  `;
}
