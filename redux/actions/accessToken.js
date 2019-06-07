import { createAction } from "redux-actions";

export const readToken = createAction("READ_TOKEN"); // Read value from Async Store
export const writeToken = createAction("WRITE_TOKEN"); // Write value to Async Stote
export const setToken = createAction("SET_TOKEN"); // Update redux state
export const signOut = createAction("SIGN_OUT");
