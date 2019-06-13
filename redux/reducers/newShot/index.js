import { combineReducers } from "redux";
import title from "./title";
import tags from "./tags";
import image from "./image";
import newTag from "./newTag";
import description from "./description";

export default combineReducers({
  tags,
  description,
  title,
  image,
  newTag
});
