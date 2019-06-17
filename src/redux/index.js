import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { authSaga, authReducer as accessToken } from "./auth";
import { userInfoSaga, userInfoReducer as userInfo } from "./user";
import { userShotsSaga, userShotsReducer as userShots } from "./shots";

export function* rootSaga() {
  yield all([authSaga(), userInfoSaga(), userShotsSaga()]);
}

export const rootReducer = combineReducers({
  accessToken,
  userInfo,
  userShots
});
