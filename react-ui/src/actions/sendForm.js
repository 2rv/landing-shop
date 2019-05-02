import {SEND_FORM_ERROR, SEND_FORM_GOOD, SEND_FORM_IN, API_SEND_FORM, FORM_NOT_VALID, SENT_CART} from "../constants";
import {request} from "../services/requests";
import Validation from "../services/validation";

export default function sendForm(data, next, cart = []) {

  let isError = false;
  data.forEach(({value, validation})=> {
    let notValid = Validation(value, validation, "SEND");
    console.log(notValid, validation);
    if(notValid === null) notValid = true;
    if(notValid === true) isError = true;

  });

  console.log(isError);

  if(isError === false) {
    return (dispatch => {
      dispatch( {type: SEND_FORM_IN, payload: {sendingData: {...data, ...cart} }} );
      request(API_SEND_FORM,"POST", {inputs: data, gds: cart})
        .then(data => {
          dispatch( {type: SEND_FORM_GOOD, payload: {isSent: true, sentData: data}} );
          dispatch( {type: SENT_CART, payload: {sentCart: cart} } );
          return data;
        })
        .then(() => {
          next()
        })
        .catch((error) => dispatch({ type: SEND_FORM_ERROR, payload: {isSent: false, error: error.message} }) ) ;
    });
  } else {
    return (dispatch => {
      dispatch({ type: FORM_NOT_VALID, payload: {sentData: {inputs: data, gds: cart}} })
    });
  }



}
