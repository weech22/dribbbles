import { handleAction } from "redux-actions";
import { setShotDescription } from "../../actions";

export default handleAction(
  setShotDescription,
  (state, action) => action.payload,
  ""
);
