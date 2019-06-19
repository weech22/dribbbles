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
const shotList = handleAction(setUserShots, (_, action) => action.payload, []);

// Create Shot Page
// TODO: Implement Reducers Map
const description = handleAction(
  setShotDescription,
  (_, action) => action.payload,
  ""
);

const image = handleAction(setShotImage, (_, action) => action.payload, {});
const newTag = handleAction(setNewTag, (_, action) => action.payload, "");
const tags = handleAction(setShotTags, (_, action) => action.payload, []);
const title = handleAction(setShotTitle, (_, action) => action.payload, "");

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
