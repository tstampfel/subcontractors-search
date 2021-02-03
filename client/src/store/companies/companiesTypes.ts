import { IOptionsData } from "../../interfaces/IOptionsData";
import { ISubcontractor } from "../../interfaces/ISubcontractors";
import {
  SET_AVAILABLE_CITIES,
  SET_AVAILABLE_SPECIALITIES,
  SET_SEARCHED_SUBCONTRACTORS,
  SET_LOADING,
  SET_IS_DIRTY,
} from "./companiesActionTypes";

interface SetAvailableCities {
  type: typeof SET_AVAILABLE_CITIES;
  cities: IOptionsData[];
}
interface SetAvailableSpecialities {
  type: typeof SET_AVAILABLE_SPECIALITIES;
  specialities: IOptionsData[];
}

interface SetCompaniesResults {
  type: typeof SET_SEARCHED_SUBCONTRACTORS;
  subcontractors: ISubcontractor[];
}

interface SetLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}
interface SetIsDirty {
  type: typeof SET_IS_DIRTY;
  isDirty: boolean;
}

export type CompaniesKnownAction =
  | SetAvailableCities
  | SetAvailableSpecialities
  | SetCompaniesResults
  | SetLoading
  | SetIsDirty;

export interface ICompaniesState {
  cities: IOptionsData[];
  specialities: IOptionsData[];
  subcontractors: ISubcontractor[];
  loading: false;
  isDirty: false;
}

export const companiesInitialState = {
  cities: [] as IOptionsData[],
  specialities: [] as IOptionsData[],
  subcontractors: [] as ISubcontractor[],
  loading: false,
  isDirty: false,
};
