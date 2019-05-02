import {CATEGORIES_SELECT_TAG, CATEGORIES_FETCH_IN, CATEGORIES_FETCH_GOOD, CATEGORIES_FETCH_ERROR, API_GET_CATEGORIES} from "../constants";
import {request} from "../services/requests";

export default function getCategories(select, type = null) {

  if(type === "LOAD") {
    return (dispatch => {
      dispatch( {type: CATEGORIES_FETCH_IN, payload: {selected: select}});
      request(API_GET_CATEGORIES,"GET")
        .then(data => {
          dispatch( {type: CATEGORIES_FETCH_GOOD, payload: data} );
          return data;
        })
        .catch(error => dispatch({ type: CATEGORIES_FETCH_ERROR, payload: {error: error.message} }) ) ;
    });
  } else {
    return (dispatch => {
      dispatch( {type: CATEGORIES_SELECT_TAG, payload: {selected: select}});

    })
  }
}
