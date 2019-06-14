import { createAction } from "redux-actions";
import * as types from "./types";

export const setUserShots = createAction(types.SET_USER_SHOTS);
export const getUserShots = createAction(types.GET_USER_SHOTS);
