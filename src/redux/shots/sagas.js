import { put, call, takeEvery, all } from "redux-saga/effects";
import { Alert } from "react-native";
import NavigationService from "../../utils/navigationService";
import { delay } from "../../utils/helper";
import {
  setUserShots,
  getUserShots,
  createShot,
  deleteShot,
  getNewShot,
  deleteShotSuccess
} from "./actions";

// Shot List Page
function* getUserShotsSaga({ payload: accessToken }) {
  const url = `https://api.dribbble.com/v2/user/shots`;

  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    const userShots = yield call(() =>
      fetch(url, params).then(response => response.json())
    );

    yield put({ type: setUserShots, payload: userShots });
  } catch (error) {}
}

function* watchGetUserShots() {
  yield takeEvery(getUserShots, getUserShotsSaga);
}

function* deleteShotSaga({ payload: { shotId, accessToken } }) {
  const url = `https://api.dribbble.com/v2/shots/${shotId}`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    yield call(fetch, url, params);
    yield put({ type: deleteShotSuccess, shotId });
  } catch (error) {
    Alert.alert("Couldn`t delete the shot, try again.");
  }
}

function* watchDeleteShot() {
  yield takeEvery(deleteShot, deleteShotSaga);
}

// Create Shot Page
function* createShotSaga({
  payload: {
    newShot: { image, title, tags, description },
    accessToken
  }
}) {
  const stringTags = JSON.stringify(tags);
  const tagsToSend = stringTags.substring(1, stringTags.length - 1);

  const body = new FormData();
  body.append("image", image);
  body.append("title", title);
  body.append("description", description);
  body.append("tags", tagsToSend);

  const url = "https://api.dribbble.com/v2/shots";

  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    },
    body
  };

  try {
    const newShotUrl = yield call(() =>
      fetch(url, params).then(response => response.headers.map.location)
    );

    yield put(getNewShot({ newShotUrl, accessToken }));
    yield call(NavigationService.navigate, "shots");
  } catch (error) {
    Alert.alert("Couldn`t create shot, try again.");
  }
}

function* watchCreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

function* getNewShotSaga({ payload: { newShotUrl, accessToken } }) {
  const shot = newShotUrl
    .substring(newShotUrl.lastIndexOf("/") + 1)
    .substring(0, newShotUrl.indexOf("-"));

  const url = `https://dribbble.com/shots/${shot}`;

  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  let response = yield call(() =>
    fetch(url, params).then(response => response.status)
  );

  while (response !== 200) {
    response = yield call(() =>
      fetch(url, params).then(response => response.status)
    );
    yield delay(100);
  }

  yield put(getUserShots(accessToken));
}

function* watchGetNewShot() {
  yield takeEvery(getNewShot, getNewShotSaga);
}

export default function* userShots() {
  yield all([
    watchGetUserShots(),
    watchCreateShot(),
    watchDeleteShot(),
    watchGetNewShot()
  ]);
}
