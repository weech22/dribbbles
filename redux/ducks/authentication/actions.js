import { createAction } from "redux-actions";
import * as types from "./types";

export const readToken = createAction(types.READ_TOKEN);
export const writeToken = createAction(types.WRITE_TOKEN);
export const setToken = createAction(types.SET_TOKEN);
