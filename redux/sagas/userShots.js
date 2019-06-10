import { put, takeEvery, call, all } from "redux-saga/effects";

export function* getUserShots(action) {
  if (action) {
    yield put({ type: "SET_USER_SHOTS", payload: action.payload }); // Update redux state
  }
}

export function* watchGetUserShots() {
  yield takeEvery("GET_USER_SHOTS", getUserShots);
}

export default function* userShots() {
  yield all([getUserShots(), watchGetUserShots()]);
}
