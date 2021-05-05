import { DataSet, Image } from '../../models/dataset';

/* eslint-disable no-unused-vars, no-shadow */
export enum DataSetsActionTypes {
  CREATE_DATASET = '@@datasets/CREATE_DATASET',
  UPDATE_DATASET = '@@datasets/UPDATE_DATASET',
  ADD_IMAGES = '@@datasets/ADD_IMAGES',
  RENAME_DATASET = '@@datasets/RENAME_DATASET',
  DELETE_DATASET = '@@datasets/DELETE_DATASET',
}

interface ActionCreateDataset {
  type: DataSetsActionTypes.CREATE_DATASET;
  payload: DataSet;
}
interface ActionUpdateDataset {
  type: DataSetsActionTypes.UPDATE_DATASET;
  payload: {
    id: number;
    images: Array<Image>;
  };
}
interface ActionAddImages {
  type: DataSetsActionTypes.ADD_IMAGES;
  payload: {
    id: number;
    images: Array<Image>;
  };
}
interface ActionRenameDataset {
  type: DataSetsActionTypes.RENAME_DATASET;
  payload: {
    index: number;
    name: string;
  };
}

interface ActionDeleteDataset {
  type: DataSetsActionTypes.DELETE_DATASET;
  payload: number;
}

export type DatasetsActions =
  | ActionCreateDataset
  | ActionRenameDataset
  | ActionAddImages
  | ActionDeleteDataset
  | ActionUpdateDataset;

export const createDataset = (payload: DataSet): ActionCreateDataset => ({
  type: DataSetsActionTypes.CREATE_DATASET,
  payload,
});

export const updateDataset = (payload: {
  id: number;
  images: Array<Image>;
}): ActionUpdateDataset => ({
  type: DataSetsActionTypes.UPDATE_DATASET,
  payload,
});

export const addImages = (payload: {
  id: number;
  images: Array<Image>;
}): ActionAddImages => ({
  type: DataSetsActionTypes.ADD_IMAGES,
  payload,
});

export const renameDataset = (payload: {
  index: number;
  name: string;
}): ActionRenameDataset => ({
  type: DataSetsActionTypes.RENAME_DATASET,
  payload,
});

export const deleteDataset = (payload: number): ActionDeleteDataset => ({
  type: DataSetsActionTypes.DELETE_DATASET,
  payload,
});
