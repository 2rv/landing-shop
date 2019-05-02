import { combineReducers } from "redux";
import scrollingPage from "./scrollingPage";
import getSlides from "./getSlides";
import getCategories from "./getCategories";
import getGds from "./getGds";
import getServices from "./getServices";
import cart from "./cart";
import fillForm from "./fillForm";

const rootReducer = combineReducers({
  scrollingPage,
  getSlides,
  getCategories,
  getGds,
  cart,
  getServices,
  fillForm
});

export default rootReducer;
