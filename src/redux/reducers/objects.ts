import { ObjectsStateType } from '../../models/reduxStore';
import { ObjectsActions, ObjectsActionTypes } from '../actions/objects';

const initialState: ObjectsStateType = [];

export default function (
  state: ObjectsStateType,
  action: ObjectsActions,
): ObjectsStateType {
  switch (action.type) {
    case ObjectsActionTypes.SAVE_OBJECTS:
      return [...action.payload];
    default:
      return state || initialState;
  }
}
