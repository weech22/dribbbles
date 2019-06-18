import { put, takeEvery, call, all } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../../utils/navigationService";
import { readToken, writeToken, setToken, signIn, signOut } from "./actions";
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";
import { getCode } from "../../utils/helper";

function* readTokenSaga() {
  const token = yield call(AsyncStorage.getItem, "@access_token");
  const nextScreen = token ? "app" : "auth";

  yield put({ type: setToken, payload: token });
  yield call(NavigationService.navigate, nextScreen);
}

function* watchReadToken() {
  yield takeEvery(readToken, readTokenSaga);
}

function* writeTokenSaga(action) {
  const { clientId, clientSecret, code } = action.payload;

  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    })
  };

  const url = "https://dribbble.com/oauth/token";

  const accessToken = yield call(() =>
    fetch(url, params).then(response =>
      response.json().then(data => data.access_token)
    )
  );

  if (accessToken) {
    yield call(AsyncStorage.setItem, "@access_token", accessToken);
    yield put({ type: setToken, payload: accessToken });
    yield call(NavigationService.navigate, "app");
  }
}

function* watchWriteToken() {
  yield takeEvery(writeToken, writeTokenSaga);
}

function* signInSaga() {
  const response = yield call(fetch, AUTH_URL);

  const url = response.url;

  if (url.includes("code")) {
    const code = getCode(url);
    yield call(writeToken, {
      code,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET
    });
  } else {
    yield call(NavigationService.navigate, "login");
  }
}

function* watchSignIn() {
  yield takeEvery(signIn, signInSaga);
}

function* signOutSaga() {
  yield call(AsyncStorage.clear);
  yield call(NavigationService.navigate, "auth");
}

function* watchSignOut() {
  yield takeEvery(signOut, signOutSaga);
}

export default function* auth() {
  yield all([
    watchWriteToken(),
    watchReadToken(),
    watchSignIn(),
    watchSignOut()
  ]);
}
