import { handleAction } from "redux-actions";

export default handleAction(
  "SET_USER_INFO",
  (state, action) => action.payload,
  {}
);
