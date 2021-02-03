// @flow
import { useApolloClient } from "@apollo/client";
import * as React from "react";
import { useRef, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { debounce } from "ts-debounce";
import { SEARCH_SUBCONTRACTORS } from "../../graphql/queries";
import { Query } from "../../graphql/utils/graphql-utils";
import {
  SET_IS_DIRTY,
  SET_LOADING,
  SET_SEARCHED_SUBCONTRACTORS,
} from "../../store/companies/companiesActionTypes";
import {
  getAvailableCities,
  getAvailableSpecialities,
  getIsDirty,
  getLoading,
} from "../../store/companies/companiesSelectors";
import CompaniesUtils from "../../utils/companies-utils";
type Props = {};
export function SearchForm(props: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const client = useApolloClient();
  const dispatch = useDispatch();

  let searchTextInputRef = useRef<any>();
  let selectedSpecialityRef = useRef<any>();
  let selectedCityRef = useRef<any>();
  const citiesOptions = useSelector(getAvailableCities);
  const specialitiesOptions = useSelector(getAvailableSpecialities);
  const loading = useSelector(getLoading);
  const isDirty = useSelector(getIsDirty);

  const clearFilter = () => {
    searchTextInputRef!.current!.value = "";
    selectedSpecialityRef.current.select.clearValue();
    selectedCityRef.current.select.clearValue();
    setSearchText("");
    setSelectedSpeciality(null);
    setSelectedCity(null);
  };

  const subcontractorsQuery = async (
    searchText: string = "",
    selectedSpecialities: string[] = [],
    selectedCity: string = ""
  ) => {
    dispatch({
      type: SET_LOADING,
      loading: true,
    });

    if (!isDirty) {
      dispatch({
        type: SET_IS_DIRTY,
        isDirty: true,
      });
    }
    if (!searchText && !selectedSpecialities && !selectedCity) {
      clearFilter();
    } else {
      const fetchedCompanies = await Query(
        client,
        SEARCH_SUBCONTRACTORS(searchText, selectedSpecialities, selectedCity)
      );
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
      dispatch({
        type: SET_SEARCHED_SUBCONTRACTORS,
        subcontractors: fetchedCompanies.data.searchCompany ?? [],
      });
    }
  };

  const searchSubcontractors = (
    e: any,
    inputName: "search" | "speciality" | "city"
  ) => {
    switch (inputName) {
      case "search":
        setSearchText(e.target.value);
        subcontractorsQuery(
          e.target.value,
          selectedSpeciality ?? [],
          selectedCity ?? ""
        );
        break;
      case "speciality":
        setSelectedSpeciality(CompaniesUtils.formatInputSpecialities(e));
        subcontractorsQuery(
          searchText ?? "",
          CompaniesUtils.formatInputSpecialities(e),
          selectedCity ?? ""
        );
        break;
      case "city":
        setSelectedCity(CompaniesUtils.formatInputCities(e));
        subcontractorsQuery(
          searchText ?? "",
          selectedSpeciality ?? [],
          CompaniesUtils.formatInputCities(e)
        );
        break;
      default:
        break;
    }
  };

  const searchDebounce = debounce(searchSubcontractors, 300);

  return (
    <div className="search-form">
      <Container className="search-form-container">
        <Form>
          <>
            <div className="search-form-title-holder">
              <h4 className="search-form-title">Search subcontractors</h4>
            </div>
            <Form.Row>
              <Form.Group as={Col} xs={12} md={4} lg={4}>
                <Form.Label className="search-form-lable">Keyword</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Search subcontractors by name.."
                  onChange={(e: any) => {
                    searchDebounce(e, "search");
                  }}
                  ref={searchTextInputRef}
                />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={4} lg={4}>
                <Form.Label className="search-form-lable">
                  Specialities
                </Form.Label>
                <Select
                  isMulti
                  name="speciality-select"
                  options={specialitiesOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select speciality..."
                  onChange={(value: any) => searchDebounce(value, "speciality")}
                  ref={selectedSpecialityRef}
                />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={4} lg={4}>
                <Form.Label className="search-form-lable">City</Form.Label>
                <Select
                  name="city-select"
                  options={citiesOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select city..."
                  onChange={(value: any) => searchDebounce(value, "city")}
                  ref={selectedCityRef}
                />
              </Form.Group>
              <Col md={{ offset: 6 }} lg={{ offset: 6 }}></Col>
              <Form.Group
                className="search-form-clear-filter"
                as={Col}
                xs={12}
                md={4}
                lg={4}
              >
                <Button
                  onClick={() => clearFilter()}
                  className="search-form-clear-filter-button"
                >
                  Clear Filter
                </Button>
              </Form.Group>
            </Form.Row>
          </>
        </Form>
      </Container>
    </div>
  );
}
