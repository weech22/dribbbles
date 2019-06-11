import { combineReducers } from "redux";
import accessToken from "./accessToken";
import userInfo from "./userInfo";
import userShots from "./userShots";
import newShot from "./newShot";

export default combineReducers({
  accessToken,
  userInfo,
  userShots,
  newShot
});
