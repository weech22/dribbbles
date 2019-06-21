import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  setUserShots,
  setShotImage,
  deleteShotSuccess,
  toggleModal
} from "./actions";

const shotList = handleActions(
  {
    [setUserShots]: (_, action) => action.payload,
    [deleteShotSuccess]: (state, action) =>
      state.filter(shot => shot.id !== action.shotId)
  },
  []
);

const image = handleAction(setShotImage, (_, action) => action.payload, {});

const isModalOpen = handleAction(toggleModal, state => !state, false);

const newShot = combineReducers({
  image,
  isModalOpen
});

export default combineReducers({
  shotList,
  newShot
});
