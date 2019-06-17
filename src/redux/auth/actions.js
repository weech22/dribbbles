import { createAction } from "redux-actions";

export const readToken = createAction("READ_TOKEN");
export const writeToken = createAction("WRITE_TOKEN");
export const setToken = createAction("SET_TOKEN");
export const signIn = createAction("SIGN_IN");
export const signOut = createAction("SIGN_OUT");
