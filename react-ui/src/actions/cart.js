import {ADD_TO_CART, REMOVE_FROM_CART, LOAD_CART} from "../constants";

export default function getCategories(cart, gds, type, next = null) {
  if(type === "ADD") {
    let isAdded = false;
    cart.data.forEach(({id})=> {
      if(id === gds.id) isAdded = true
    });

    if(isAdded === false) {
      return (dispatch => {
        dispatch( {type: ADD_TO_CART, payload: {cart, gds}} );
      });
    } else {
      return (dispatch => {
        dispatch( {type: LOAD_CART} );
      });
    }
  }

  else if(type === "REMOVE") {
    return (dispatch => {
      dispatch( {type: REMOVE_FROM_CART, payload: {cart, gds}} );
    });
  }

  else if(type === "TOGGLE") {
    let isAdded = false;
    cart.data.forEach(({id})=> {
      if(id === gds.id) isAdded = true
    });

    if(isAdded) {
      return (dispatch => {
        dispatch( {type: REMOVE_FROM_CART, payload: {cart, gds}} );
      });
    } else {
      return (dispatch => {
        dispatch( {type: ADD_TO_CART, payload: {cart, gds}} );
      });
    }
  }

  else {
    return (dispatch => {
      dispatch( {type: LOAD_CART} );
    });
  }
}
