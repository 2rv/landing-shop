import {SLIDES_FETCH_IN, SLIDES_FETCH_GOOD, SLIDES_FETCH_ERROR} from "../constants";

const initialState = {
  isLoading: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SLIDES_FETCH_IN:
      return {...state, isLoading: true};

    case SLIDES_FETCH_GOOD:
      return {...state, isLoading: false, ...action.payload};

    case SLIDES_FETCH_ERROR:
      return {...state, isLoading: false, ...action.payload};

    default:
      return state;
  }

};
