import { combineReducers } from "redux";
import companiesReducer from "./companies/companiesReducer";

const rootReducer = combineReducers({
  companies: companiesReducer,
});

export default rootReducer;
