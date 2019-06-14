import { put, takeEvery, call, all } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../../../utils/navigationService";
import { readToken, writeToken, setToken, signOut } from "./actions";

export function* readTokenSaga(action) {
  const token = yield call(AsyncStorage.getItem, "@access_token");
  const nextScreen = token ? "App" : "Auth";

  yield put({ type: setToken, payload: token });
  yield call(NavigationService.navigate, nextScreen);
}

export function* watchReadToken() {
  yield takeEvery(readToken, readTokenSaga);
}

export function* writeTokenSaga(action) {
  const token = action && action.payload;

  yield call(AsyncStorage.setItem, "@access_token", token);
  yield put({ type: setToken, payload: token });
  yield call(NavigationService.navigate, "App");
}

export function* watchWriteToken() {
  yield takeEvery(writeToken, writeTokenSaga);
}

export default function* authentication() {
  yield all([watchWriteToken(), watchReadToken()]);
}
