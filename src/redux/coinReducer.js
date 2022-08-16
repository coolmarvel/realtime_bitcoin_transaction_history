import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as API from "../api/coinReducerAPI";
import produce from "immer";

// INITIAL STATE
const initialState = {
  coinData: [],
};

// ACTION TYPES
export const [GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE] =
  createRequestActionTypes("GET_DATA");

export const [GET_DATA_ASYNC, GET_DATA_ASYNC_SUCCESS, GET_DATA_ASYNC_FAILURE] =
  createRequestActionTypes("GET_DATA_ASYNC");

// ACTION CREATOR
export const getData = createAction(GET_DATA);
export const getDataAsync = createAction(GET_DATA_ASYNC, (data) => data);

// CREATE SAGA
const getDataSaga = createRequestSaga(GET_DATA_ASYNC, API.getData);

// MAIN SAGA
export function* coinSaga() {
  yield takeLatest(GET_DATA_ASYNC, getDataSaga);
}

// REDUCER
const coinReducer = handleActions(
  {
    [GET_DATA_ASYNC_SUCCESS]: (state, { payload: data }) =>
      produce(state, (draft) => {
        console.log("data", data);
        draft["coinData"] = data;
      }),
    [GET_DATA_ASYNC_FAILURE]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft["coinData"] = null;
      }),
  },
  initialState
);

export default coinReducer;
