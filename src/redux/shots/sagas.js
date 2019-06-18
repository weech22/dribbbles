import { put, call, takeEvery, all } from "redux-saga/effects";
import { Alert } from "react-native";
import NavigationService from "../../utils/navigationService";
import { setUserShots, getUserShots, createShot, deleteShot } from "./actions";

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

  yield call(fetch, `https://api.dribbble.com/v2/shots/${shotId}`, params);

  yield put({ type: getUserShots, payload: token });
}

function* watchDeleteShot() {
  yield takeEvery(deleteShot, deleteShotSaga);
}

// Create Shot Page
function* createShotSaga(action) {
  const { image, title, tags, description } = action.payload.newShot;

  if (title && image.uri) {
    const newShotData = new FormData();
    newShotData.append("image", image);
    newShotData.append("title", title);
    newShotData.append("description", description);
    newShotData.append("tags", tags);

    const body = newShotData;
    const token = action.payload.accessToken;
    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      body
    };

    const url = "https://api.dribbble.com/v2/shots";

    //yield call(fetch, url, params);

    yield call(() =>
      fetch(url, params).then(response => {
        console.log(params);
        console.log(response);
      })
    );

    yield call(NavigationService.navigate, "shots");
  } else {
    Alert.alert("Title and image are required");
  }
}

function* watchcreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

export default function* userShots() {
  yield all([watchGetUserShots(), watchcreateShot(), watchDeleteShot()]);
}
