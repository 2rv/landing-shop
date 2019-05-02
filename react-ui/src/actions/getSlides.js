import {SLIDES_FETCH_IN, SLIDES_FETCH_GOOD, SLIDES_FETCH_ERROR, API_GET_SLIDES} from "../constants";
import {request} from "../services/requests";

export default function getSlides(next) {

  return (dispatch => {
    dispatch( {type: SLIDES_FETCH_IN} );
    request(API_GET_SLIDES,"GET")
      .then(data => {
        dispatch( {type: SLIDES_FETCH_GOOD, payload: data} );
        return data;
      })
      .then(obj => {
        next(obj.data.length)
      })
      .catch(error => dispatch({ type: SLIDES_FETCH_ERROR, payload: {error: error.message} }) ) ;
  });
}
