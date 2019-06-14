import { takeEvery, call, all } from "redux-saga/effects";
import NavigationService from "../../../utils/navigationService";
import { createShot } from "./actions";

export function* createShotSaga(action) {
  const body = action.payload.data;
  const token = action.payload.token;
  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
    body
  };

  yield call(fetch, `https://api.dribbble.com/v2/shots`, params);
  yield call(NavigationService.navigate, "Shots");
}

export function* watchcreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

export default function* authInit() {
  yield all([watchcreateShot()]);
}
