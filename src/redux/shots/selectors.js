import * as R from "ramda";

const newShot = (key, state) => R.path(["userShots", "newShot", key], state);

export const getShotList = state => R.path(["userShots", "shotList"], state);
export const getTitle = state => newShot("title", state);
export const getDescription = state => newShot("description", state);
export const getTags = state => newShot("tags", state);
export const getImage = state => newShot("image", state);
export const getNewTag = state => newShot("newTag", state);
