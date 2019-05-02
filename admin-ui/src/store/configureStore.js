import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
import logger from 'redux-logger';
import {loadState, saveState} from "../services/localstore";

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger)
);

store.subscribe(() => {
  saveState({
    doAuth: store.getState().doAuth,
  });
});
