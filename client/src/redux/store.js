import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

/**
 *
 * @chromeExtension -> return redux dev tools
 */

const chromeExtension = () => {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

chromeExtension();

export const store = createStore(reducers, compose(applyMiddleware(thunk)));
