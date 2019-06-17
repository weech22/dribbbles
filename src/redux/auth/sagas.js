import { put, takeEvery, call, all } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../../utils/navigationService";
import { readToken, writeToken, setToken, signIn, signOut } from "./actions";
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";
import { requestToken, getCode } from "../../utils/helper";

function* readTokenSaga() {
  const token = yield call(AsyncStorage.getItem, "@access_token");
  const nextScreen = token ? "App" : "Auth";

  yield put({ type: setToken, payload: token });
  yield call(NavigationService.navigate, nextScreen);
}

function* watchReadToken() {
  yield takeEvery(readToken, readTokenSaga);
}

function* writeTokenSaga(action) {
  const token = action && action.payload;

  yield call(AsyncStorage.setItem, "@access_token", token);
  yield put({ type: setToken, payload: token });
  yield call(NavigationService.navigate, "App");
}

function* watchWriteToken() {
  yield takeEvery(writeToken, writeTokenSaga);
}

function* signInSaga() {
  const response = yield call(fetch, AUTH_URL);

  const url = response.url;

  if (url.includes("code")) {
    const code = getCode(url);
    yield call(requestToken, writeToken, code, CLIENT_ID, CLIENT_SECRET);
  } else {
    yield call(NavigationService.navigate, "Login");
  }
}

function* watchSignIn() {
  yield takeEvery(signIn, signInSaga);
}

function* signOutSaga() {
  yield call(AsyncStorage.clear);
  yield call(NavigationService.navigate, "Auth");
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
