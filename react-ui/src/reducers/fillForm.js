import {FILL_FORM, GET_FORM, SEND_FORM_ERROR, SEND_FORM_GOOD, SEND_FORM_IN, FORM_NOT_VALID} from "../constants";

const initialState = {
  isLoaded: false,
  isSent: null,
  notValid: null,
  name: {
    name: "name",
    value: "",
    isError: null,
    validation: "NAME",
  },
  surname: {
    name: "surname",
    value: "",
    isError: null,
    validation: "NAME",
  },
  email: {
    name: "email",
    value: "",
    isError: null,
    validation: "EMAIL",
  },
  phone: {
    name: "phone",
    value: "",
    isError: null,
    validation: "PHONE",
  },
  message: {
    name: "message",
    value: "",
    isError: null,
    validation: "MESSAGE",
  },
  sizes: {
    name: "sizes",
    value: "",
    isError: null,
    validation: "TEXT",
  },
  file: {
    name: "file",
    value: "",
    isError: null,
    validation: "FILE",
  },
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SEND_FORM_IN:
      return {...state, ...action.payload};

    case SEND_FORM_GOOD:
      // console.log(1);
      return {...initialState, isLoaded: true, sentData: action.payload.sentData};

    case SEND_FORM_ERROR:
      return {...state, isSent: false, notValid: false, ...action.payload};

    case FORM_NOT_VALID:
      return {...state, isSent: null, notValid: true, ...action.payload};

    case GET_FORM:
      return {...state, isLoaded: true, ...action.payload};

    case FILL_FORM:
      const {old, name, value, isError} = action.payload;
      old[name].value = value;
      old[name].isError = isError;

      return {...state, ...old};

    default:
      return state;
  }

};
