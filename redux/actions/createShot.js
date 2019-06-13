import { createAction } from "redux-actions";

export const createShot = createAction("CREATE_SHOT");
export const setShotTitle = createAction("SET_SHOT_TITLE");
export const setShotDescription = createAction("SET_SHOT_DESCRIPTION");
export const setShotTags = createAction("SET_SHOT_TAGS");
export const setShotImage = createAction("SET_SHOT_IMAGE");
export const setNewTag = createAction("SET_NEW_TAG");
