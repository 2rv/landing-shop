import {DATA_PENDING, DATA_GOOD, DATA_ERROR, API_DATA_EDIT} from "../constants";
import {request} from "../services/requests"

export default function getData(key, data, auth) {

  return (dispatch => {
    dispatch( {type: DATA_PENDING, payload: {}} );
    request(API_DATA_EDIT, "POST", {key, auth, data})
      .then((data)=> {
        dispatch( {type: DATA_GOOD, payload: data} );
      })
      .catch(error => dispatch({ type: DATA_ERROR, payload: {error: error.message} }) ) ;
  });




}
