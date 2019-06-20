import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { authSaga, authReducer as accessToken } from "./auth";
import { userShotsSaga, userShotsReducer as userShots } from "./shots";

export function* rootSaga() {
  yield all([authSaga(), userShotsSaga()]);
}

export const rootReducer = combineReducers({
  accessToken,
  userShots
});
