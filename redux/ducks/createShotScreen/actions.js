import { createAction } from "redux-actions";
import * as types from "./types";

export const createShot = createAction(types.CREATE_SHOT);
export const setShotTitle = createAction(types.SET_TITLE);
export const setShotDescription = createAction(types.SET_DESCRIPTION);
export const setShotTags = createAction(types.SET_TAGS);
export const setShotImage = createAction(types.SET_IMAGE);
export const setNewTag = createAction(types.SET_NEW_TAG);
