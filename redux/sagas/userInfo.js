import { put, takeEvery, all, call } from "redux-saga/effects";
import { getUserInfo, setUserInfo } from "../actions";

export function* getUserInfoSaga(action) {
  const token = action.payload;
  const url = `https://api.dribbble.com/v2/user?access_token=${token}`;
  const userInfo = yield call(() =>
    fetch(url).then(response => response.json())
  );

  yield put({ type: setUserInfo, payload: userInfo });
}

export function* watchGetUserInfo() {
  yield takeEvery(getUserInfo, getUserInfoSaga);
}

export default function* userInfo() {
  yield all([watchGetUserInfo()]);
}
