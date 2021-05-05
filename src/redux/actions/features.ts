import { FeaturesType, FeatureType } from '../../models/features';

/* eslint-disable no-unused-vars, no-shadow*/
export enum FeatureActionTypes {
  SAVE_FEATURES = '@@features/SAVE_FEATURES',
  CHANGE_FEATURE = '@@features/CHANGE_FEATURE',
  CHANGE_MODEL = '@@features/CHANGE_MODEL',
}

interface ActionSaveFeatures {
  type: FeatureActionTypes.SAVE_FEATURES;
  payload: FeaturesType;
}

interface ActionChangeFeature {
  type: FeatureActionTypes.CHANGE_FEATURE;
  payload: FeatureType;
}

interface ActionChangeModel {
  type: FeatureActionTypes.CHANGE_MODEL;
  payload: string;
}

export type FeaturesActions =
  | ActionSaveFeatures
  | ActionChangeFeature
  | ActionChangeModel;

export const saveFeatures = (payload: FeaturesType): ActionSaveFeatures => ({
  type: FeatureActionTypes.SAVE_FEATURES,
  payload,
});

export const changeFeature = (payload: FeatureType): ActionChangeFeature => ({
  type: FeatureActionTypes.CHANGE_FEATURE,
  payload,
});

export const changeModel = (payload: string): ActionChangeModel => ({
  type: FeatureActionTypes.CHANGE_MODEL,
  payload,
});
