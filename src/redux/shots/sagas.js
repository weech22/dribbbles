import { put, call, takeEvery, all } from "redux-saga/effects";
import { Alert } from "react-native";
import NavigationService from "../../utils/navigationService";
import { setUserShots, getUserShots, createShot } from "./actions";

// Shot List Page
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

// Create Shot Page
export function* createShotSaga(action) {
  const { image, title, tags, description } = action.payload.newShot;

  if (title && image.uri) {
    const newShotData = new FormData();
    newShotData.append("image", image);
    newShotData.append("title", title);
    newShotData.append("description", description);
    newShotData.append("tags", tags);

    const body = action.payload.newShotData;
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

    yield call(fetch, `https://api.dribbble.com/v2/shots`, params);
    yield call(NavigationService.navigate, "Shots");
  } else {
    Alert.alert("Title and image are required");
  }
}

export function* watchcreateShot() {
  yield takeEvery(createShot, createShotSaga);
}

export default function* userShots() {
  yield all([watchGetUserShots(), watchcreateShot()]);
}
