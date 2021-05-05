import { ServerInfoType } from '../../models/serverInfo';

/* eslint-disable no-unused-vars, no-shadow*/
export enum ServerInfoActionTypes {
  CONNECT_SERVER = '@@serverInfo/CONNECT_SERVER',
  SAVE_SERVER_INFO = '@@serverInfo/SAVE_SERVER_INFO',
  SAVE_VIDEO_INFO = '@@serverInfo/SAVE_VIDEO_INFO',
  SHUTDOWN_SERVER = '@@serverInfo/SHUTDOWN_SERVER',
  CHANGE_SERVER_IN = '@@serverInfo/CHANGE_SERVER_IN',
  CHANGE_SERVER_OUT = '@@serverInfo/CHANGE_SERVER_OUT',
}

interface ActionConnectServer {
  type: ServerInfoActionTypes.CONNECT_SERVER;
  payload: Pick<ServerInfoType, 'address' | 'port'>;
}

interface ActionSaveServerInfo {
  type: ServerInfoActionTypes.SAVE_SERVER_INFO;
  payload: Pick<ServerInfoType, 'version' | 'serverIn' | 'serverOut'>;
}

interface ActionSaveVideoInfo {
  type: ServerInfoActionTypes.SAVE_VIDEO_INFO;
  payload: Pick<
    ServerInfoType,
    'width' | 'height' | 'fpsCap' | 'fpsDet' | 'delay'
  >;
}

interface ActionChangeServerIn {
  type: ServerInfoActionTypes.CHANGE_SERVER_IN;
  payload: string;
}

interface ActionChangeServerOut {
  type: ServerInfoActionTypes.CHANGE_SERVER_OUT;
  payload: string;
}

interface ActionShutdownServer {
  type: ServerInfoActionTypes.SHUTDOWN_SERVER;
}

export type ServerInfoActions =
  | ActionConnectServer
  | ActionSaveServerInfo
  | ActionSaveVideoInfo
  | ActionChangeServerIn
  | ActionChangeServerOut
  | ActionShutdownServer;

export const connectServer = ({
  address,
  port,
}: Pick<ServerInfoType, 'address' | 'port'>): ActionConnectServer => ({
  type: ServerInfoActionTypes.CONNECT_SERVER,
  payload: {
    address,
    port,
  },
});

export const saveServerInfo = ({
  version,
  serverIn,
  serverOut,
}: Pick<
  ServerInfoType,
  'version' | 'serverIn' | 'serverOut'
>): ActionSaveServerInfo => ({
  type: ServerInfoActionTypes.SAVE_SERVER_INFO,
  payload: {
    version,
    serverIn,
    serverOut,
  },
});

export const saveVideoInfo = ({
  width,
  height,
  fpsCap,
  fpsDet,
  delay,
}: Pick<
  ServerInfoType,
  'width' | 'height' | 'fpsCap' | 'fpsDet' | 'delay'
>): ActionSaveVideoInfo => ({
  type: ServerInfoActionTypes.SAVE_VIDEO_INFO,
  payload: {
    width,
    height,
    fpsCap,
    fpsDet,
    delay,
  },
});

export const changeServerIn = (src: string): ServerInfoActions => ({
  type: ServerInfoActionTypes.CHANGE_SERVER_IN,
  payload: src,
});

export const changeServerOut = (src: string): ServerInfoActions => ({
  type: ServerInfoActionTypes.CHANGE_SERVER_OUT,
  payload: src,
});

export const shutdownServer = (): ServerInfoActions => ({
  type: ServerInfoActionTypes.SHUTDOWN_SERVER,
});
