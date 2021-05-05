import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationStateType, ReduxStoreType } from '../../models/reduxStore';
import { hideMessage } from '../../redux/actions/notification';
import Alert from './Alert';

const useStyles = makeStyles(() => ({
  container: {
    left: '50%',
    right: 'auto',
    bottom: '24px',
    transform: 'translateX(-50%)',
    display: 'flex',
    zIndex: 1400,
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snackbar: {
    display: 'flex',
    padding: '6px 16px',
    fontSize: '1.2rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.43,
    borderRadius: '4px',
    letterSpacing: '0.01071em',
    backgroundColor: 'transparent',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
    opacity: 0,
    transform: 'scale(0.75, 0.5625)',
    transition: `opacity 195ms cubic-bezier (0.4, 0, 0.2, 1) 0ms, 
                  transform 130ms cubic-bezier (0.4, 0, 0.2, 1) 65ms`,
    '&.active': {
      opacity: 1,
      transform: 0,
      transition:
        'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  error: {
    color: '#fff',
    fontWeight: 500,
    backgroundColor: 'rgb(244 67 54)',
  },
  warning: {
    color: '#fff',
    fontWeight: 500,
    backgroundColor: 'rgb(255 152 0)',
  },
  info: {
    color: '#fff',
    fontWeight: 500,
    backgroundColor: 'rgb(33 150 243)',
  },
  success: {
    color: '#fff',
    fontWeight: 500,
    backgroundColor: 'rgb(76 175 80)',
  },
}));

export default function Snackbar(): ReactElement {
  const classes = useStyles();
  const { variant, message } = useSelector<
    ReduxStoreType,
    NotificationStateType
  >((s) => s.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 2000);
    }
  }, [dispatch, message]);
  return (
    <>
      <div className={clsx(classes.container)}>
        <div
          className={clsx(
            classes.snackbar,
            message && 'active',
            variant === 'error' && classes.error,
            variant === 'info' && classes.info,
            variant === 'success' && classes.success,
          )}
        >
          <Alert variant="message">{message}</Alert>
        </div>
      </div>
    </>
  );
}
