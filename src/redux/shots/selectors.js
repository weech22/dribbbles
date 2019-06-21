import * as R from "ramda";

const newShot = (key, state) => R.path(["userShots", "newShot", key], state);

export const getShotList = state => R.path(["userShots", "shotList"], state);
export const getImage = state => newShot("image", state);
