import { put, call, takeEvery, all } from "redux-saga/effects";
import { Alert } from "react-native";
import NavigationService from "../../utils/navigationService";
import { delay } from "../../utils/helper";
import {
  setUserShots,
  getUserShots,
  createShot,
  deleteShot,
  deleteShotFail,
  getNewShot,
  deleteShotSuccess
} from "./actions";

// Shot List Page
function* getUserShotsSaga(action) {
  const accessToken = action.payload;

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
  } catch (error) {
    // yield put ( user list fetch failed)
    console.log("User shots list fetch failed: ", error);
  }
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
    //yield put({ type: deleteShotFail, error });
    console.log("Delete shot failed: ", error);
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
  if (title && image.uri) {
    const body = new FormData();
    body.append("image", image);
    body.append("title", title);
    body.append("description", description);
    tags.forEach(tag => {
      body.append("tags", tag);
    });
    // Only 1 tag is being accepted

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
      console.log("Create shot failed: ", error);
    }
  } else {
    Alert.alert("Title and image are required");
  }
}

function* watchCreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

function* getNewShotSaga({ payload: { newShotUrl, accessToken } }) {
  const shot = newShotUrl
    .substring(newShotU.lastIndexOf("/") + 1)
    .substring(0, newShotU.indexOf("-"));

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
      fetch(formattedUrl, params).then(response => response.status)
    );
    yield delay(10);
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
