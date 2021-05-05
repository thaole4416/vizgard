import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement } from 'react';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    padding: '6px 16px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.43,
    borderRadius: '4px',
    letterSpacing: '0.01071em',
    backgroundColor: 'transparent',
    wordBreak: 'break-word',
    margin: '16px auto',
  },
  error: {
    color: 'rgb(97, 26, 21)',
    backgroundColor: 'rgb(253, 236, 234)',
  },
  info: {
    color: 'rgb(13, 60, 97)',
    backgroundColor: 'rgb(232, 244, 253)',
  },
  success: {
    color: 'rgb(30, 70, 32)',
    backgroundColor: 'rgb(237, 247, 237)',
  },
  message: {
    color: 'inherit',
    background: 'inherit',
  },
}));

interface AlertProps {
  variant: 'error' | 'info' | 'success' | 'warning' |'message';
  children: ReactElement | string;
}

export default function Alert({ variant, children }: AlertProps): ReactElement {
  const classes = useStyles();
  return (
    <div
      className={clsx(
        classes.container,
        variant === 'error' && classes.error,
        variant === 'info' && classes.info,
        variant === 'success' && classes.success,
      )}
    >
      {children}
    </div>
  );
}
