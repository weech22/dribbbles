import { put, takeEvery, call, all } from "redux-saga/effects";

export function* getUserInfo(action) {
  if (action) {
    yield put({ type: "SET_USER_INFO", payload: action.payload }); // Update redux state
  }
}

export function* watchGetUserInfo() {
  yield takeEvery("GET_USER_INFO", getUserInfo);
}

export default function* userInfo() {
  yield all([getUserInfo(), watchGetUserInfo()]);
}
