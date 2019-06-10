import { combineReducers } from "redux";
import accessToken from "./accessToken";
import userInfo from "./userInfo";
import userShots from "./userShots";

export default combineReducers({
  accessToken,
  userInfo,
  userShots
});
