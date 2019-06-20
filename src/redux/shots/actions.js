import { createAction } from "redux-actions";

// Shot List Page
export const setUserShots = createAction("SET_USER_SHOTS");
export const getUserShots = createAction("GET_USER_SHOTS");
export const deleteShot = createAction("DELETE_SHOT");
export const deleteShotSuccess = createAction("DELETE_SHOT_SUCCESS");
export const deleteShotFail = createAction("DELETE_SHOT_FAIL");

// Create Shot Page
export const createShot = createAction("CREATE_SHOT");
export const setShotTitle = createAction("SET_TITLE");
export const setShotDescription = createAction("SET_DESCRIPTION");
export const setShotTags = createAction("SET_TAGS");
export const setShotImage = createAction("SET_IMAGE");
export const setNewTag = createAction("SET_NEW_TAG");
