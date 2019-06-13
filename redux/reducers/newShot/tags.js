import { handleAction } from "redux-actions";
import { setShotTags } from "../../actions";

export default handleAction(setShotTags, (state, action) => action.payload, []);
