import { DataSet } from './dataset';
import { FeaturesType } from './features';
import { NotificationType } from './notification';
import { ObjectType } from './objects';
import { ServerInfoType } from './serverInfo';

export type SocketStateType = WebSocket | null;
export type FeaturesStateType = FeaturesType;
export type ObjectsStateType = ObjectType[];
export type ServerInfoStateType = ServerInfoType;
export type NotificationStateType = NotificationType;
export type DataSetState = DataSet[];
export interface ReduxStoreType {
  socket: SocketStateType;
  features: FeaturesStateType;
  objects: ObjectsStateType;
  serverInfo: ServerInfoStateType;
  notification: NotificationStateType;
  datasets: DataSetState;
}
