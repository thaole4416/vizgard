import { ServerInfoType } from '../../models/serverInfo';
import { ServerInfoActions, ServerInfoActionTypes } from '../actions/serverInfo';
import { SocketActions, SocketActionTypes } from '../actions/socket';
const initialState: WebSocket | null = null;

export default function (
  state: WebSocket | null,
  action: ServerInfoActions | SocketActions,
): WebSocket | null {
  switch (action.type) {
    case ServerInfoActionTypes.CONNECT_SERVER: {
      const { address, port } = action.payload as ServerInfoType;
      const socket = new WebSocket(`ws://${address}:${port}`);
      return socket;
    }
    case SocketActionTypes.CLOSE_SOCKET: {
      return initialState;
    }
    default:
      return state || initialState;
  }
}
