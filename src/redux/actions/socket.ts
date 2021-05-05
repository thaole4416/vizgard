/* eslint-disable no-unused-vars, no-shadow*/
export enum SocketActionTypes {
  SAVE_SOCKET = '@@socket/SAVE_SOCKET',
  CLOSE_SOCKET = '@@socket/CLOSE_SOCKET'
}

interface ActionSaveSocket {
  type: SocketActionTypes.SAVE_SOCKET;
  payload: WebSocket;
}

interface ActionCloseSocket {
 type: SocketActionTypes.CLOSE_SOCKET;
}

export type SocketActions = ActionSaveSocket | ActionCloseSocket;

export const saveSocket = (payload: WebSocket): ActionSaveSocket => ({
  type: SocketActionTypes.SAVE_SOCKET,
  payload,
});

export const closeSocket = (): ActionCloseSocket => ({
  type: SocketActionTypes.CLOSE_SOCKET,
});
