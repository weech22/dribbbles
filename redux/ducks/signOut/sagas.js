import { all, call, takeEvery } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../../../utils/navigationService";
import { signOut } from "./actions";

export function* signOutSaga() {
  yield call(AsyncStorage.clear);
  yield call(NavigationService.navigate, "Auth");
}

export function* watchSignOut() {
  yield takeEvery(signOut, signOutSaga);
}

export default function* authentication() {
  yield all([watchSignOut()]);
}
