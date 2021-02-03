import { IRootState } from "../root-states";

export const getAvailableCities = (state: IRootState) => state.companies.cities;
export const getAvailableSpecialities = (state: IRootState) =>
  state.companies.specialities;
export const getSearchedSubcontractors = (state: IRootState) =>
  state.companies.subcontractors;
export const getLoading = (state: IRootState) => state.companies.loading;
export const getIsDirty = (state: IRootState) => state.companies.isDirty;
