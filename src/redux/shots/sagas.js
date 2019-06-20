import { put, call, takeEvery, all } from "redux-saga/effects";
import { Alert } from "react-native";
import NavigationService from "../../utils/navigationService";
import {
  setUserShots,
  getUserShots,
  createShot,
  deleteShot,
  deleteShotFail,
  deleteShotSuccess
} from "./actions";

// Shot List Page
function* getUserShotsSaga(action) {
  const token = action.payload;
  const url = `https://api.dribbble.com/v2/user/shots?access_token=${token}`;
  const userShots = yield call(() =>
    fetch(url).then(response => response.json())
  );

  yield put({ type: setUserShots, payload: userShots });
}

function* watchGetUserShots() {
  yield takeEvery(getUserShots, getUserShotsSaga);
}

function* deleteShotSaga(action) {
  const shotId = action.payload.shotId;
  const token = action.payload.accessToken;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const url = `https://api.dribbble.com/v2/shots/${shotId}`;

  //yield call(fetch, url, params);

  try {
    yield call(() =>
      fetch(url, params).then(response => console.log(response))
    );
    console.log("ds");
    yield put({ type: deleteShotSuccess, shotId });
  } catch (error) {
    yield put({ type: deleteShotFail, error });
  }

  // TODO: Find a way to either invoke getUserShotsSaga(), or alter the Redux store
}

function* watchDeleteShot() {
  yield takeEvery(deleteShot, deleteShotSaga);
}

// Create Shot Page
function* createShotSaga(action) {
  const { image, title, tags, description } = action.payload.newShot;

  if (title && image.uri) {
    const body = new FormData();
    body.append("image", image);
    body.append("title", title);
    body.append("description", description);
    tags.forEach(tag => {
      body.append("tags", tag);
    });
    // Only 1 tag is being accepted

    const token = action.payload.accessToken;

    const url = "https://api.dribbble.com/v2/shots";

    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      body
    };

    yield call(fetch, url, params);

    yield call(NavigationService.navigate, "shots");
  } else {
    Alert.alert("Title and image are required");
  }
}

function* watchCreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

export default function* userShots() {
  yield all([watchGetUserShots(), watchCreateShot(), watchDeleteShot()]);
}
