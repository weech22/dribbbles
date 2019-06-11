import { put, takeEvery, call, all } from "redux-saga/effects";

import NavigationService from "../../utils/navigationService.js";
import { createShot } from "../actions";

export function* createShotSaga(action) {
  const body = action && JSON.stringify(action.payload);

  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body
  };

  fetch("https://api.dribbble.com/v2/shots", params)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });

  yield call(NavigationService.navigate, "Shots");
}

export function* watchcreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

export default function* authInit() {
  yield all([watchcreateShot()]);
}
