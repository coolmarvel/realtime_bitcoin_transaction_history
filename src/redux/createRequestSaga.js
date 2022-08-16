import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    var response = null;
    try {
      // console.warn(action);
      response = yield call(request, action.payload);
      if (response === null || response === undefined) {
        yield put({
          type: SUCCESS,
          payload: "FAIL",
        });
        console.warn("result: FAIL!!");
      } else {
        yield put({
          type: SUCCESS,
          payload: response,
          // payload: response.data, <= 주석 response로 받기로 했음.
        });
        // console.warn(response);
      }
    } catch (e) {
      if (response === null || response === undefined) {
        yield put({
          type: FAILURE,
          payload: e,
          error: "Fail",
        });
        console.warn(e);
      } else {
        yield put({
          type: FAILURE,
          payload: e,
          error: response,
        });
        console.warn(response);
        console.warn(e);
      }
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
