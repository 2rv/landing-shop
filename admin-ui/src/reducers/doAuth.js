import {AUTH_PENDING, AUTH_GOOD, AUTH_ERROR} from "../constants";

const initialState = {
  isLogged: false,
  login: "",
  password: ""
};

export default (state = initialState, action) => {

  switch (action.type) {
    case AUTH_PENDING:
      return {...state, isLogged: false, ...action.payload};

    case AUTH_GOOD:
      return {...state, isLogged: true, ...action.payload};

    case AUTH_ERROR:
      return {...state, isLogged: false};

    default:
      return state;
  }

};
