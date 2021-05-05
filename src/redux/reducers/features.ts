import { FeaturesType } from '../../models/features';
import { FeaturesStateType } from '../../models/reduxStore';
import { FeaturesActions, FeatureActionTypes } from '../actions/features';

const initialState: FeaturesStateType = {
  cameraCalibration: 0,
  faceRedaction: 0,
  graphicsDisplay: 0,
  singleTracking: 0,
  detection: 0,
  stabilization: 0,
  aruco: 0,
  classes: {
  },
};

export default function (
  state: FeaturesStateType,
  action: FeaturesActions,
): FeaturesStateType {
  switch (action.type) {
    case FeatureActionTypes.SAVE_FEATURES:
      return { ...state, ...action.payload as FeaturesType };
    default:
      return state || initialState;
  }
}
