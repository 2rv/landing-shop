import {CATEGORIES_SELECT_TAG, CATEGORIES_FETCH_IN, CATEGORIES_FETCH_GOOD, CATEGORIES_FETCH_ERROR} from "../constants";

const initialState = {
  isLoading: null
};

export default (state = initialState, action) => {

  switch (action.type) {

    case CATEGORIES_SELECT_TAG:
      return {...state, ...action.payload};

    case CATEGORIES_FETCH_IN:
      return {...state, isLoading: true, ...action.payload};

    case CATEGORIES_FETCH_GOOD:
      return {...state, isLoading: false, ...action.payload};

    case CATEGORIES_FETCH_ERROR:
      return {...state, isLoading: false, ...action.payload};

    default:
      return state;
  }

};
