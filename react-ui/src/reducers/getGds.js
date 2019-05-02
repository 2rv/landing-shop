import {GDS_FETCH_IN, GDS_FETCH_GOOD, GDS_FETCH_ERROR} from "../constants";

const initialState = {
  isLoading: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GDS_FETCH_IN:
      return {...state, isLoading: true};

    case GDS_FETCH_GOOD:
      return {...state, isLoading: false, ...action.payload};

    case GDS_FETCH_ERROR:
      return {...state, isLoading: false, ...action.payload};

    default:
      return state;
  }

};
