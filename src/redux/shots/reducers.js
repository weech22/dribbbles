import { handleAction } from "redux-actions";
import { combineReducers } from "redux";
import {
  setUserShots,
  setShotDescription,
  setShotImage,
  setNewTag,
  setShotTags,
  setShotTitle
} from "./actions";

// Shot List Page
const shotList = handleAction(
  setUserShots,
  (state, action) => action.payload,
  []
);

// Create Shot Page
// TODO: Implement Reducers Map
const description = handleAction(
  setShotDescription,
  (state, action) => action.payload,
  ""
);

const image = handleAction(setShotImage, (state, action) => action.payload, {});
const newTag = handleAction(setNewTag, (state, action) => action.payload, "");
const tags = handleAction(setShotTags, (state, action) => action.payload, []);
const title = handleAction(setShotTitle, (state, action) => action.payload, "");

const newShot = combineReducers({
  tags,
  description,
  title,
  image,
  newTag
});

export default combineReducers({
  shotList,
  newShot
});
