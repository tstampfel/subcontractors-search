import {
  companiesInitialState,
  ICompaniesState,
} from "./companies/companiesTypes";

export interface IRootState {
  companies: ICompaniesState;
}

export const rootStates = {
  companies: companiesInitialState,
};
