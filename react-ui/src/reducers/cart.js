import {ADD_TO_CART, REMOVE_FROM_CART, LOAD_CART, SENT_CART} from "../constants";

const initialState = {
  data: [],
  added: [],
};

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        data: [...action.payload.cart.data, action.payload.gds],
        added: [...action.payload.cart.added, action.payload.gds.id]
      };

    case REMOVE_FROM_CART:
      const new_data = action.payload.cart.data.filter(({id}) => id !== action.payload.gds.id);
      const new_added = action.payload.cart.added.filter((id) => id !== action.payload.gds.id);
      return {...state, data: new_data, added: new_added};

    case LOAD_CART:
      return {...state};

    case SENT_CART:
      return { ...initialState, ...action.payload };

    default:
      return state;
  }

};
