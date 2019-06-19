import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { Alert } from "react-native";
import NavigationService from "../../utils/navigationService";
import { setUserShots, getUserShots, createShot, deleteShot } from "./actions";

// Shot List Page
function* getUserShotsSaga(action) {
  const token = action.payload;

  console.log(action);
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

  yield call(fetch, url, params);

  // TODO
  // yield call(getUserShots, token);
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
    //newShotData.append("tags", tags);

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
