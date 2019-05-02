import { SCROLLING_UP, SCROLLING_DOWN } from "../constants";

const initialState = {
  currentOffset: 0,
  oldOffset: 0,
  scrollingDirection: null
};

export default function scrollingPage (state = initialState, action) {


  switch (action.type) {
    case SCROLLING_UP:
      return {...state, oldOffset: action.payload.currentOffset, scrollingDirection: "up"};

    case SCROLLING_DOWN:
      return {...state, oldOffset: action.payload.currentOffset, scrollingDirection: "down"};

    default:
      return state;
  }

};
