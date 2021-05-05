import { NotificationStateType } from '../../models/reduxStore';
import { NotificationActions, NotificationActionTypes } from '../actions/notification';

const initialState: NotificationStateType = {
  message: '',
  variant: '',
};

export default function (
  state: NotificationStateType,
  action: NotificationActions,
): NotificationStateType {
  switch (action.type) {
    case NotificationActionTypes.SEND_MESSAGE:
      return { ...action.payload };
    case NotificationActionTypes.HIDE_MESSAGE:
      return initialState;
    default:
      return state || initialState;
  }
}
