import { NotificationType } from '../../models/notification';

/* eslint-disable no-unused-vars, no-shadow*/
export enum NotificationActionTypes {
  SEND_MESSAGE = '@@notification/SEND_MESSAGE',
  HIDE_MESSAGE = '@@notification/HIDE_MESSAGE',
}

interface ActionSendMessage {
  type: NotificationActionTypes.SEND_MESSAGE;
  payload: NotificationType;
}

interface ActionHideMessage {
  type: NotificationActionTypes.HIDE_MESSAGE;
}

export type NotificationActions = ActionSendMessage | ActionHideMessage;

export const sendMessage = (payload: NotificationType): ActionSendMessage => ({
  type: NotificationActionTypes.SEND_MESSAGE,
  payload,
});

export const hideMessage = (): ActionHideMessage => ({
  type: NotificationActionTypes.HIDE_MESSAGE,
});
