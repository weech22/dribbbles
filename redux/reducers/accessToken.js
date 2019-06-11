import { handleAction } from "redux-actions";
import { setToken } from "../actions";

export default handleAction(setToken, (state, action) => action.payload, null);
