import { handleAction } from "redux-actions";
import { setUserShots } from "./actions";

export default handleAction(
  setUserShots,
  (state, action) => action.payload,
  []
);
