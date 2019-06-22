import { createAction } from "redux-actions";

// Shot List Page
export const setUserShots = createAction("SET_USER_SHOTS");
export const getUserShots = createAction("GET_USER_SHOTS");
export const deleteShot = createAction("DELETE_SHOT");
export const deleteShotSuccess = createAction("DELETE_SHOT_SUCCESS");
export const deleteShotFail = createAction("DELETE_SHOT_FAIL");

// Create Shot Page
export const createShot = createAction("CREATE_SHOT");
export const getNewShot = createAction("GET_NEW_SHOT");
export const setShotImage = createAction("SET_IMAGE");
export const toggleModal = createAction("TOGGLE_MODAL");
