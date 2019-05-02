import {DATA_PENDING, DATA_GOOD, DATA_ERROR} from "../constants";

const initialState = {
  isLoaded: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case DATA_PENDING:
      return {...state, isLoaded: null, ...action.payload};

    case DATA_GOOD:
      return {...state, isLoaded: true, ...action.payload};

    case DATA_ERROR:
      return {...state, isLoaded: false};

    default:
      return state;
  }

};
