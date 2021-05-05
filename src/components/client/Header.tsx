import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStoreType, SocketStateType } from '../../models/reduxStore';
import { ServerInfoType } from '../../models/serverInfo';
import { connectServer, shutdownServer } from '../../redux/actions/serverInfo';
import { closeSocket } from '../../redux/actions/socket';
const useStyles = makeStyles(() => ({
  header: {
    borderBottom: '1px solid #e7e8e8',
    height: '5rem',
  },
  serverInfo: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    '& input': {
      width: '125px',
      outline: 'none',
      margin: '1rem 1rem 1rem .5rem',
    },
    '& label': {
      marginBottom: 0,
    },
  },
  button: {
    border: '1px solid #b7b7b7',
    background: '#EBEBEB',
    padding: '3px 10px',
    '&.active': {
      background: '#12ef8c',
      color: 'white',
      padding: '3px 10px',
      border: '1px solid #b7b7b7',
    },
  },
}));
export default function Header(): ReactElement {
  const classes = useStyles();
  const [address, setAddress] = useState<string>('192.168.99.188');
  const [port, setPort] = useState<number>(8673);
  const serverInfo = useSelector<ReduxStoreType, ServerInfoType>(
    (s) => s.serverInfo,
  );
  const socket = useSelector<ReduxStoreType, SocketStateType>((s) => s.socket);
  const dispatch = useDispatch();

  const changeAddress = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const changePort = (e: ChangeEvent<HTMLInputElement>): void => {
    setPort(Number(e.target.value));
  };

  const handleConnect = (): void => {
    if (socket) {
      socket.close();
      dispatch(closeSocket());
      dispatch(shutdownServer());
    }
    else {
      dispatch(connectServer({ address, port }));
    }
  };
  return (
    <header className={clsx(classes.header)}>
      <h1>Client</h1>
      <div id="server-info" className={classes.serverInfo}>
        <label htmlFor="server-address">Server Network Address</label>
        <input
          id="server-address"
          type="text"
          value={address}
          onChange={changeAddress}
        />
        <label htmlFor="server-port">Port</label>
        <input
          id="server-port"
          type="number"
          role="textbox"
          value={port}
          onChange={changePort}
        />
        <button
          type="button"
          id="btn-connect"
          className={clsx(classes.button, serverInfo.version && 'active')}
          onClick={handleConnect}
        >
          {serverInfo.version ? 'Connected' : 'Connect'}
        </button>
      </div>
    </header>
  );
}
