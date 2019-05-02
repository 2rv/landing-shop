import {SERVICES_FETCH_IN, SERVICES_FETCH_GOOD, SERVICES_FETCH_ERROR, API_GET_SERVICES} from "../constants";
import {request} from "../services/requests";

export default function getServices() {
  return (dispatch => {
    dispatch( {type: SERVICES_FETCH_IN, payload: {}} );
    request(API_GET_SERVICES,"GET")
      .then(data => {
        dispatch( {type: SERVICES_FETCH_GOOD, payload: data} );
        return data;
      })
      .catch(error => dispatch({ type: SERVICES_FETCH_ERROR, payload: {error: error.message} }) ) ;
  });
}
