import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReduxStoreType,
  ServerInfoStateType,
  SocketStateType,
} from '../../models/reduxStore';
import { saveFeatures } from '../../redux/actions/features';
import { sendMessage } from '../../redux/actions/notification';
import { saveObjects } from '../../redux/actions/objects';
import { saveServerInfo, saveVideoInfo } from '../../redux/actions/serverInfo';
import { closeSocket } from '../../redux/actions/socket';

export default function Socket(): null {
  const { isConnect } = useSelector<ReduxStoreType, ServerInfoStateType>(
    (s) => s.serverInfo,
  );
  const socket = useSelector<ReduxStoreType, SocketStateType>((s) => s.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMessageEvent = (e: any) => {
      const json = JSON.parse(e.data);
      if (json.objects) {
        dispatch(
          saveVideoInfo({
            width: json.width,
            height: json.height,
            fpsCap: json.fpsCap,
            fpsDet: json.fpsDet,
            delay: json.delay,
          }),
        );
        dispatch(saveObjects(json.objects));
      } else {
        dispatch(
          saveServerInfo({
            serverIn: json.serverIn,
            serverOut: json.serverOut,
            version: json.version,
          }),
        );
        dispatch(
          saveFeatures({
            detection: json.detection,
            singleTracking: json.singleTracking,
            faceRedaction: json.faceRedaction,
            stabilization: json.stabilization,
            graphicsDisplay: json.graphicsDisplay,
            cameraCalibration: json.cameraCalibration,
            aruco: json.aruco,
            classes: json.classes,
          }),
        );
      }
    };
    if (isConnect && socket) {
      socket.onmessage = handleMessageEvent;
      socket.onclose = () => {
        dispatch(closeSocket());
      };
      socket.onerror = () => {
        dispatch(
          sendMessage({
            variant: 'error',
            message: 'Unable to connect to the server!',
          }),
        );
        dispatch(closeSocket());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnect, socket]);
  return null;
}
