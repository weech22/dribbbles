import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { authSaga, authReducer as accessToken } from "./authentication";
import { userInfoSaga, userInfoReducer as userInfo } from "./userInfo";
import { shotsSaga, shotsReducer as userShots } from "./shotList";
import { createShotSaga, createShotReducer as newShot } from "./createShot";
import { signOutSaga } from "./signOut";

export function* rootSaga() {
  yield all([
    authSaga(),
    userInfoSaga(),
    shotsSaga(),
    createShotSaga(),
    signOutSaga()
  ]);
}

export const rootReducer = combineReducers({
  accessToken,
  userInfo,
  userShots,
  newShot
});
