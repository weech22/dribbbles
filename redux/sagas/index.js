import { all } from "redux-saga/effects";
import authInit from "./authInit";
import userInfo from "./userInfo";
import userShots from "./userShots";

export default function* rootSaga() {
  yield all([authInit(), userInfo(), userShots()]);
}
