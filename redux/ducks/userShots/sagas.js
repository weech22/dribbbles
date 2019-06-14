import { put, call, takeEvery, all } from "redux-saga/effects";
import { setUserShots, getUserShots } from "./actions";

export function* getUserShotsSaga(action) {
  const token = action.payload;

  const url = `https://api.dribbble.com/v2/user/shots?access_token=${token}`;
  const userShots = yield call(() =>
    fetch(url).then(response => response.json())
  );

  yield put({ type: setUserShots, payload: userShots });
}

export function* watchGetUserShots() {
  yield takeEvery(getUserShots, getUserShotsSaga);
}

export default function* userShots() {
  yield all([watchGetUserShots()]);
}
