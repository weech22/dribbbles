import { handleAction } from "redux-actions";
import { setUserInfo } from "./actions";

export default handleAction(setUserInfo, (state, action) => action.payload, {});
