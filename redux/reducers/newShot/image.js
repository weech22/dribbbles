import { handleAction } from "redux-actions";
import { setShotImage } from "../../actions";

export default handleAction(
  setShotImage,
  (state, action) => action.payload,
  {}
);
