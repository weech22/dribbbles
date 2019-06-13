import { handleAction } from "redux-actions";
import { setNewTag } from "../../actions";

export default handleAction(setNewTag, (state, action) => action.payload, "");
