import {AUTH_PENDING, AUTH_GOOD, AUTH_ERROR, API_DO_AUTH} from "../constants";
import {request} from "../services/requests"

export default function sendForm(data) {
  return (dispatch => {
    dispatch( {type: AUTH_PENDING, payload: {}} );
    request(API_DO_AUTH, "POST", data)
      .then((data)=> {
        dispatch( {type: AUTH_GOOD, payload: data} );
      })
      .catch(error => dispatch({ type: AUTH_ERROR, payload: {error: error.message} }) ) ;
  });




}
