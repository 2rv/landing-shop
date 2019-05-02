import {SERVICES_FETCH_IN, SERVICES_FETCH_GOOD, SERVICES_FETCH_ERROR} from "../constants";

const initialState = {
  isLoading: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SERVICES_FETCH_IN:
      return {...state, isLoading: true};

    case SERVICES_FETCH_GOOD:
      return {...state, isLoading: false, ...action.payload};

    case SERVICES_FETCH_ERROR:
      return {...state, isLoading: false, ...action.payload};

    default:
      return state;
  }

};
