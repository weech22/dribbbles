import { put, takeEvery, call, all } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";

import NavigationService from "../../utils/navigationService.js";

export function* readToken() {
  const token = yield AsyncStorage.getItem("@access_token"); // Read Token in Async Store
  yield put({ type: "SET_TOKEN", payload: token }); // Update redux state
  const nextScreen = token !== null ? "App" : "Auth";
  yield call(NavigationService.navigate, nextScreen);
}

export function* watchReadToken() {
  yield takeEvery("READ_TOKEN", readToken);
}

export function* writeToken(action) {
  const token = action && action.payload;
  if (token) {
    yield AsyncStorage.setItem("@access_token", token); // Updates Async Storage
    yield put({ type: "SET_TOKEN", payload: token }); // Updates redux state
    yield call(NavigationService.navigate, "App");
  }
}

export function* watchWriteToken() {
  yield takeEvery("WRITE_TOKEN", writeToken);
}

export function* signOut() {
  yield AsyncStorage.clear();

  yield call(NavigationService.navigate, "Auth");
}

export function* watchSignOut() {
  yield takeEvery("SIGN_OUT", signOut);
}

export default function* authInit() {
  yield all([
    writeToken(),
    watchWriteToken(),
    readToken(),
    watchReadToken(),
    signOut(),
    watchSignOut()
  ]);
}
