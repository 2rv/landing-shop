import {FILL_FORM, GET_FORM} from "../constants";
import validation from "../services/validation";
import {getBase} from "../services/baseconverter";

export default function fillForm(name = null, value = null, old = null,) {
  if(name === null && value === null && old === null) {
    return (dispatch => {
      dispatch( {type: GET_FORM, payload: {}} );
    });
  } else {
    return (dispatch => {
      const isError = validation(value, old[name].validation);
      console.log(isError, "Iseror")

      if(old[name].validation === "FILE") {
        getBase(value, (new_value)=> {
          dispatch( {type: FILL_FORM, payload: {name, value: new_value, isError, old}} );
        })
      }
      else {
        dispatch( {type: FILL_FORM, payload: {name, value, isError, old}} );
      }
    });
  }

}
