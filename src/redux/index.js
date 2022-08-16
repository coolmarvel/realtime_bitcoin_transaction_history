import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import loading from "./loading";

import coinReducer, { coinSaga } from "./coinReducer";

const rootReducer = combineReducers({
  coinReducer,
  loading,
});

export function* rootSaga() {
  yield all([coinSaga()]);
}

export default rootReducer;
