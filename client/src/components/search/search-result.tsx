// @flow
import * as React from "react";
import { Table, Image, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ISubcontractor } from "../../interfaces/ISubcontractors";
import {
  getIsDirty,
  getLoading,
  getSearchedSubcontractors,
} from "../../store/companies/companiesSelectors";
type Props = {};
export function SearchResult(props: Props) {
  const searchedSubcontractors = useSelector(getSearchedSubcontractors);
  const loading = useSelector(getLoading);
  const isDirty = useSelector(getIsDirty);

  return (
    <div className="search-result">
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Speciality</th>
            <th>City</th>
          </tr>
        </thead>
        {searchedSubcontractors.length > 0 && !loading && (
          <tbody>
            {searchedSubcontractors.map(
              (subcontractor: ISubcontractor, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="subcontractor-tr">
                      <span className="subcontractor-items">
                        <Image
                          className="subcontractor-logo"
                          src="http://placekitten.com/26/26"
                          roundedCircle
                        />
                        {subcontractor.name}
                      </span>
                    </td>
                    <td>{subcontractor.speciality.name}</td>
                    <td>{subcontractor.city.name}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        )}
        {searchedSubcontractors.length === 0 && !loading && isDirty && (
          <tbody>
            <tr>
              <td className="table-no-results" colSpan={4}>
                No results, try refining your search above.
              </td>
            </tr>
          </tbody>
        )}

        {searchedSubcontractors.length === 0 && !loading && !isDirty && (
          <tbody>
            <tr>
              <td className="table-no-results" colSpan={4}>
                Use search form above to find suitable subcontractors.
              </td>
            </tr>
          </tbody>
        )}

        {loading && (
          <tbody>
            <tr>
              <td className="table-no-results" colSpan={4}>
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
}
