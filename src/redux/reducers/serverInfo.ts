import { ServerInfoStateType } from '../../models/reduxStore';
import { ServerInfoType } from '../../models/serverInfo';
import { ServerInfoActions, ServerInfoActionTypes } from '../actions/serverInfo';

const initialState: ServerInfoStateType = {
  address: '127.0.0.1',
  port: 8673,
  version: '',
  serverIn: '',
  serverOut: '',
  delay: 0,
  fpsCap: 0,
  fpsDet: 0,
  height: 0,
  width: 0,
  isConnect: false,
};

export default function (
  state: ServerInfoStateType,
  action: ServerInfoActions,
): ServerInfoStateType {
  switch (action.type) {
    case ServerInfoActionTypes.CONNECT_SERVER: {
      const { address, port } = action.payload as ServerInfoType;
      return { ...state, isConnect: true, address, port };
    }
    case ServerInfoActionTypes.SAVE_VIDEO_INFO: {
      const {
        width,
        height,
        fpsCap,
        fpsDet,
        delay,
      } = action.payload as ServerInfoType;
      return {
        ...state,
        isConnect: true,
        width,
        height,
        fpsCap,
        fpsDet,
        delay,
      };
    }
    case ServerInfoActionTypes.SAVE_SERVER_INFO: {
      const { version, serverIn, serverOut } = action.payload as ServerInfoType;
      return { ...state, isConnect: true, version, serverIn, serverOut };
    }
    case ServerInfoActionTypes.SHUTDOWN_SERVER:
      return initialState;
    default:
      return state || initialState;
  }
}
