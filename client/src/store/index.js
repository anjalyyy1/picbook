import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { compose } from "redux";

const reducerList = combineReducers(reducers);

let store = createStore(reducerList, compose(applyMiddleware(thunk)));

export default function configureStore() {
  return store;
}

export { store };
