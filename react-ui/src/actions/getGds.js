import {GDS_FETCH_IN, GDS_FETCH_GOOD, GDS_FETCH_ERROR, API_GET_GDS} from "../constants";
import {request} from "../services/requests";

export default function getCategories(filter, ifEmpty) {
  return (dispatch => {
    dispatch( {type: GDS_FETCH_IN, payload: {filter}} );
    request(API_GET_GDS,"POST", {filter})
      .then(data => {
        dispatch( {type: GDS_FETCH_GOOD, payload: data} );
        return data;
      })
      .then((obj) => {
        if(obj.data.length === 0) {
          console.log("data are empty")
          ifEmpty();
        }
      })
      .catch(error => dispatch({ type: GDS_FETCH_ERROR, payload: {filter, error: error.message} }) ) ;
  });
}
