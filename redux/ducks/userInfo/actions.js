import { createAction } from "redux-actions";
import * as types from "./types";

export const setUserInfo = createAction(types.SET_USER_INFO);
export const getUserInfo = createAction(types.GET_USER_INFO);
