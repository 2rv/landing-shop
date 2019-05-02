import {DATA_PENDING, DATA_GOOD, DATA_ERROR, API_DATA_REMOVE} from "../constants";
import {request} from "../services/requests"

export default function getData(key, id, auth) {

  return (dispatch => {
    dispatch( {type: DATA_PENDING, payload: {}} );
    request(API_DATA_REMOVE, "POST", {key, auth, id})
      .then((data)=> {
        dispatch( {type: DATA_GOOD, payload: data} );
      })
      .catch(error => dispatch({ type: DATA_ERROR, payload: {error: error.message} }) ) ;
  });




}
