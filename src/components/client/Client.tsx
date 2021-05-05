import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import blackLogo from '../../assets/images/blacklogo.jpg';
import {
  FeaturesStateType,
  ObjectsStateType,
  ReduxStoreType,
  SocketStateType,
} from '../../models/reduxStore';
import { ServerInfoType } from '../../models/serverInfo';
import theme from '../../styles/theme';
import { drawRect } from '../../utils/canvas';
import { sendSocketMessage } from '../../utils/socket';
import Features from './Features';
import Header from './Header';
const useStyles = makeStyles(() => ({
  button: {
    border: '1px solid #b7b7b7',
    background: '#EBEBEB',
    padding: '3px 10px',
  },
  mainSection: {
    display: 'flex',
  },
  mainInfo: {
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginLeft: '.5rem',
  },
  video: {
    width: '50%',
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
  },
  videoInput: {
    display: 'flex',
    alignItems: 'center',
    '& label': {
      width: '20%',
      marginBottom: 0,
    },
    '& input': {
      flex: 1,
    },
    '& span': {
      width: '10%',
      textAlign: 'center',
    },
  },
  preview: {
    position: 'relative',
    '& img, canvas, video': {
      width: '100%',
    },
    '& canvas': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
    },
  },
  json: {
    width: '30%',
    // height: 'calc(100vh - 1000px)',
    overflowY: 'auto',
    paddingTop: '1rem',
    [theme.breakpoints.down.md]: {
      display: 'none',
    },
  },
}));
let context: CanvasRenderingContext2D;
export default function Client(): ReactElement {
  const classes = useStyles();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [serverIn, setServerIn] = useState<string>('');
  const [serverOut, setServerOut] = useState<string>('');
  const [clientIn, setClientIn] = useState<string>('');
  const [videoSrc, setVideoSrc] = useState<string>('');
  const socket = useSelector<ReduxStoreType, SocketStateType>((s) => s.socket);
  const serverInfo = useSelector<ReduxStoreType, ServerInfoType>(
    (s) => s.serverInfo,
  );
  const features = useSelector<ReduxStoreType, FeaturesStateType>(
    (s) => s.features,
  );
  const objects = useSelector<ReduxStoreType, ObjectsStateType>(
    (s) => s.objects,
  );
  const handleUpdateServerIn = (): void => {
    if (socket) {
      sendSocketMessage(socket, `update-server-video-in ${serverIn}`);
    }
  };
  const handleUpdateServerOut = (): void => {
    if (socket) {
      sendSocketMessage(socket, `update-server-video-out ${serverOut}`);
    }
  };
  const handleUpdateClientIn = (): void => {
    setVideoSrc(clientIn);
  };
  const handleShutdownServer = (): void => {
    if (socket) {
      sendSocketMessage(socket, 'shutdown');
    }
  };
  const hanldeSingleTrack = (e: MouseEvent<HTMLCanvasElement>): void => {
    if (socket && canvas.current) {
      const rect = canvas.current?.getBoundingClientRect();
      const x = parseInt(
        (
          ((e.clientX - rect.left) * canvas.current.width) /
          rect.width
        ).toString(),
      );

      const y = parseInt(
        (
          ((e.clientY - rect.top) * canvas.current.height) /
          rect.height
        ).toString(),
      );
      sendSocketMessage(socket, `single-track ${x} ${y}`);
    }
  };

  useEffect(() => {
    if (features.graphicsDisplay && context) {
      context.clearRect(
        0,
        0,
        canvas.current?.width ?? 0,
        canvas.current?.height ?? 0,
      );
      objects.forEach(({ singleTracking, x, y, w, h }) => {
        drawRect({ context, singleTracking, x, y, w, h });
      });
    }
  }, [features, objects]);

  useEffect(() => {
    if (
      serverInfo.serverIn !== serverIn ||
      serverInfo.serverOut !== serverOut
    ) {
      setServerIn(serverInfo.serverIn);
      setServerOut(serverInfo.serverOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverInfo]);

  useEffect(() => {
    if (canvas && canvas.current) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      context = canvas.current.getContext('2d')!;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Header/>
      <div id="main-info" className={classes.mainInfo}>
        {serverInfo.width
          ? `${serverInfo.width} x ${serverInfo.height} | WebRTC | FPS Capture: ${serverInfo.fpsCap} | FPS DEtection: ${serverInfo.fpsDet} | Delay: ${serverInfo.delay}ms`
          : null}
      </div>
      <div
        id="main-section"
        className={classes.mainSection}
        style={{
          height: `calc(100vh - 5rem - 62px - ${
            serverInfo.width ? '26px' : '0px'
          })`,
        }}
      >
        <Features/>
        <div className={classes.video}>
          <div id="video-preview" className={classes.preview}>
            <img
              src={blackLogo}
              alt=""
              style={{ display: !videoSrc ? 'block' : 'none' }}
            />
            <video
              src={videoSrc}
              autoPlay
              style={{ display: videoSrc ? 'block' : 'none' }}
              data-vscid="bdogi47m3"
            />
            <canvas
              style={{ display: !videoSrc ? 'block' : 'none' }}
              id="canvas-bounding-box"
              onMouseUp={hanldeSingleTrack}
              ref={canvas}
              width={serverInfo.width || 1920}
              height={serverInfo.height || 1080}
            />
          </div>
          <div className={clsx(classes.videoInput, 'my-2')}>
            <label htmlFor="server-video-in">Server Video In</label>
            <input
              id="server-video-in"
              type="text"
              value={serverIn}
              onChange={(e) => setServerIn(e.target.value)}
            />
            <button
              type="button"
              className={clsx(classes.button, 'm-2')}
              onClick={handleUpdateServerIn}
            >
              Update
            </button>
          </div>
          <div className={clsx(classes.videoInput, 'my-2')}>
            <label htmlFor="server-video-out">Server Video Out</label>
            <input
              id="server-video-out"
              type="text"
              value={serverOut}
              onChange={(e) => setServerOut(e.target.value)}
            />
            <button
              type="button"
              className={clsx(classes.button, 'm-2')}
              onClick={handleUpdateServerOut}
            >
              Update
            </button>
          </div>
          <div className={clsx(classes.videoInput, 'my-2')}>
            <label htmlFor="client-video-in">Client Video In</label>
            <input
              id="client-video-in"
              type="text"
              value={clientIn}
              onChange={(e) => setClientIn(e.target.value)}
            />
            <button
              type="button"
              className={clsx(classes.button, 'm-2')}
              onClick={handleUpdateClientIn}
            >
              Update
            </button>
          </div>
          <button
            type="button"
            className={classes.button}
            onClick={handleShutdownServer}
          >
            Shutdown Server
          </button>
        </div>
        <div id="json-section" className={classes.json}>
          <pre>{objects.length ? JSON.stringify(objects, null, 2) : null}</pre>
        </div>
      </div>
    </main>
  );
}
