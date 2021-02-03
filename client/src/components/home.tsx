import { useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GET_ALL_CITIES, GET_ALL_SPECIALITIES } from "../graphql/queries";
import { Query } from "../graphql/utils/graphql-utils";
import {
  SET_AVAILABLE_CITIES,
  SET_AVAILABLE_SPECIALITIES,
} from "../store/companies/companiesActionTypes";
import CompaniesUtils from "../utils/companies-utils";
import { SearchForm } from "./search/search-form";
import { SearchResult } from "./search/search-result";

function Home(props: any) {
  const client = useApolloClient();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchDropdownData() {
      const fetchedCities = await Query(client, GET_ALL_CITIES());
      const featchedSpecialities = await Query(client, GET_ALL_SPECIALITIES());

      dispatch({
        type: SET_AVAILABLE_CITIES,
        cities: CompaniesUtils.transformToOptionsForm(
          fetchedCities.data.getAllCities
        ),
      });
      dispatch({
        type: SET_AVAILABLE_SPECIALITIES,
        specialities: CompaniesUtils.transformToOptionsForm(
          featchedSpecialities.data.getAllSpecialities
        ),
      });
    }
    fetchDropdownData();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12}>
            <SearchForm />
          </Col>
          <Col xs={12}>
            <SearchResult />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
