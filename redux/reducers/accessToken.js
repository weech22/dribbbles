import { handleAction } from "redux-actions";

export default handleAction(
  "SET_TOKEN",
  (state, action) => action.payload,
  null
);
