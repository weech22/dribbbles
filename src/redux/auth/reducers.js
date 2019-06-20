import { handleAction } from "redux-actions";
import { setToken } from "./actions";

export default handleAction(setToken, (_, action) => action.payload, null);
