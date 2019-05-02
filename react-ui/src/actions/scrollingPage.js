import {SCROLLING_UP, SCROLLING_DOWN} from "../constants";

export default function scrollingPage({currentOffset, oldOffset}) {
  return (dispatch => {
    if (currentOffset > oldOffset) {
      dispatch( {type: SCROLLING_DOWN, payload: {currentOffset, oldOffset}} );
    } else if (currentOffset < oldOffset) {
      dispatch( {type: SCROLLING_UP, payload: {currentOffset, oldOffset}} );
    }
  });

}
