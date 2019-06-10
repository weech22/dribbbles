import { handleAction } from "redux-actions";

export default handleAction(
  "SET_USER_SHOTS",
  (state, action) => action.payload,
  []
);
