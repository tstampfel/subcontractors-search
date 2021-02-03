/* eslint-disable import/no-anonymous-default-export */
import {
  SET_AVAILABLE_CITIES,
  SET_AVAILABLE_SPECIALITIES,
  SET_IS_DIRTY,
  SET_LOADING,
  SET_SEARCHED_SUBCONTRACTORS,
} from "./companiesActionTypes";
import { CompaniesKnownAction, companiesInitialState } from "./companiesTypes";

export default (
  state = companiesInitialState,
  action: CompaniesKnownAction
) => {
  switch (action.type) {
    case SET_AVAILABLE_CITIES:
      return { ...state, cities: action.cities };
    case SET_AVAILABLE_SPECIALITIES:
      return { ...state, specialities: action.specialities };
    case SET_SEARCHED_SUBCONTRACTORS:
      return { ...state, subcontractors: action.subcontractors };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_IS_DIRTY:
      return { ...state, isDirty: action.isDirty };
    default:
      return state;
  }
};
