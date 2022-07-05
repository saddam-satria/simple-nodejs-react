import { combineReducers } from 'redux';
import { WELCOME } from '../types';

const initalState = {
  data: 'hello world',
};

const welcome = (state = initalState, action) => {
  switch (action) {
    case WELCOME:
      return { ...state };

    default:
      return state;
  }
};

export const reducers = combineReducers({
  welcome,
});
