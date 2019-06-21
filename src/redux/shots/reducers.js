import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { setUserShots, setShotImage, deleteShotSuccess } from "./actions";

const shotList = handleActions(
  {
    [setUserShots]: (_, action) => action.payload,
    [deleteShotSuccess]: (state, action) =>
      state.filter(shot => shot.id !== action.shotId)
  },
  []
);

const image = handleAction(setShotImage, (_, action) => action.payload, {});

const newShot = combineReducers({
  image
});

export default combineReducers({
  shotList,
  newShot
});
