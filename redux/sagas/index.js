import { all } from "redux-saga/effects";
import {
  watchReadToken,
  watchWriteToken,
  readToken,
  writeToken,
  signOut,
  watchSignOut
} from "./accessToken";

export default function* rootSaga() {
  yield all([
    writeToken(),
    watchWriteToken(),
    readToken(),
    watchReadToken(),
    signOut(),
    watchSignOut()
  ]);
}
