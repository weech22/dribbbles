import { combineReducers } from "redux";
import title from "./title";
import tags from "./tags";
import description from "./description";

export default combineReducers({
  tags,
  description,
  title
});
