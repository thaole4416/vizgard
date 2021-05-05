export interface FeaturesType {
  detection: 0 | 1;
  singleTracking: 0 | 1;
  faceRedaction: 0 | 1;
  stabilization: 0 | 1;
  graphicsDisplay: 0 | 1;
  cameraCalibration: 0 | 1;
  aruco: 0 | 1;
  classes: Record<string, 0 | 1>
}

export type FeatureType = keyof FeaturesType;
