import { handleAction } from "redux-actions";
import { setShotTitle } from "../../actions";

export default handleAction(
  setShotTitle,
  (state, action) => action.payload,
  ""
);
