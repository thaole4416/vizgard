import { ObjectType } from '../../models/objects';

/* eslint-disable no-unused-vars, no-shadow*/
export enum ObjectsActionTypes {
  SAVE_OBJECTS = '@@objects/SAVE_OBJECTS',
}

interface ActionSaveObjects {
  type: ObjectsActionTypes.SAVE_OBJECTS;
  payload: Array<ObjectType>
}

export type ObjectsActions = ActionSaveObjects;

export const saveObjects = (payload: Array<ObjectType>): ActionSaveObjects => ({
  type: ObjectsActionTypes.SAVE_OBJECTS,
  payload,
});
