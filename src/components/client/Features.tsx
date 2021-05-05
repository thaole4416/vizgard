import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { FeatureType } from '../../models/features';
import {
  FeaturesStateType,
  ReduxStoreType,
  ServerInfoStateType,
  SocketStateType,
} from '../../models/reduxStore';
import { sendSocketMessage } from '../../utils/socket';
import { camelCaseToKebabCase, toCapitalCase } from '../../utils/string';
const useStyles = makeStyles(() => ({
  features: {
    borderRight: '1px solid #e7e8e8',
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    paddingTop: '1rem',
    overflowY: 'auto',
    '& > span': {
      margin: '6px',
      padding: '6px',
      border: 'solid 1px #b7b7b7',
      cursor: 'pointer',
    },
    '& input': {
      marginLeft: 'auto',
    },
  },
  feature: {
    background: '#EBEBEB',
    display: 'flex',
    alignItems: 'center',
  },
  version: {
    padding: '20px',
    marginTop: 'auto',
  },
}));
export default function Features(): ReactElement {
  const classes = useStyles();
  const serverInfo = useSelector<ReduxStoreType, ServerInfoStateType>(
    (s) => s.serverInfo,
  );
  const features = useSelector<ReduxStoreType, FeaturesStateType>(
    (s) => s.features,
  );
  const socket = useSelector<ReduxStoreType, SocketStateType>((s) => s.socket);
  const handleChangeFeatures = (feature: FeatureType) => () => {
    if (socket) {
      sendSocketMessage(socket, `toggle-${camelCaseToKebabCase(feature)}`);
    }
  };
  const handleChangeClasses = (model: string) => () => {
    if (socket) {
      sendSocketMessage(socket, `toggle-model-class ${model}`);
    }
  };
  return (
    <div id="features-section" className={classes.features}>
      <span
        id="cmd-toggle-detection"
        className={classes.feature}
        onClick={handleChangeFeatures('detection')}
      >
        <span>Object Detection</span>
        <input
          type="checkbox"
          value={features.detection}
          checked={Boolean(features.detection)}
          onChange={handleChangeFeatures('detection')}
        />
      </span>
      <span className={classes.feature}>Toggle Model</span>
      {Object.keys(features.classes).map((k) => (
        <span
          key={k}
          id="cmd-toggle-single-tracking"
          className={clsx(classes.feature, 'ml-4')}
          onClick={handleChangeClasses(k)}
        >
          <span>{toCapitalCase(k)}</span>
          <input
            type="checkbox"
            value={features.classes[k]}
            checked={Boolean(features.classes[k])}
          />
        </span>
      ))}
      <span
        id="cmd-toggle-single-tracking"
        className={classes.feature}
        onClick={handleChangeFeatures('singleTracking')}
      >
        <span>Single Object Tracking</span>
        <input
          type="checkbox"
          value={features.singleTracking}
          checked={Boolean(features.singleTracking)}
          onChange={handleChangeFeatures('singleTracking')}
        />
      </span>
      <span
        id="cmd-toggle-face-redaction"
        className={classes.feature}
        onClick={handleChangeFeatures('faceRedaction')}
      >
        <span>Face Redaction</span>
        <input
          type="checkbox"
          onChange={handleChangeFeatures('faceRedaction')}
          value={features.faceRedaction}
          checked={Boolean(features.faceRedaction)}
        />
      </span>
      <span
        id="cmd-toggle-face-redaction"
        className={classes.feature}
        onClick={handleChangeFeatures('aruco')}
      >
        <span>ArUco Marker</span>
        <input
          type="checkbox"
          onChange={handleChangeFeatures('aruco')}
          value={features.aruco}
          checked={Boolean(features.aruco)}
        />
      </span>
      <span
        id="cmd-toggle-stabilization"
        className={classes.feature}
        onClick={handleChangeFeatures('stabilization')}
      >
        <span>Video Stabilization</span>
        <input
          type="checkbox"
          value={features.stabilization}
          checked={Boolean(features.stabilization)}
          onChange={handleChangeFeatures('stabilization')}
        />
      </span>
      <span
        className={classes.feature}
        onClick={handleChangeFeatures('graphicsDisplay')}
      >
        <span>On Screen Display</span>
        <input
          checked={Boolean(features.graphicsDisplay)}
          onChange={handleChangeFeatures('graphicsDisplay')}
          type="checkbox"
          value={features.graphicsDisplay}
        />
      </span>
      <span
        className={classes.feature}
        onClick={handleChangeFeatures('cameraCalibration')}
      >
        <span>Calibrate Mode</span>
        <input
          type="checkbox"
          value={features.cameraCalibration}
          checked={Boolean(features.cameraCalibration)}
          onChange={handleChangeFeatures('cameraCalibration')}
        />
      </span>
      <div id="server-version" className={classes.version}>
        {serverInfo.version ? `Server ${serverInfo.version}` : null}
      </div>
    </div>
  );
}
