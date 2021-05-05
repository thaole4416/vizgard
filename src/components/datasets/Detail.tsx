import { makeStyles } from '@material-ui/styles';
import { ReactElement, ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { DataSetState, ReduxStoreType } from '../../models/reduxStore';
import Typography from '../common/Typography';
import Grid from '../common/Grid';
import Popup from 'reactjs-popup';
import Annotation from './Annotation';
import AnnotableImages from './‎AnnotableImages';
import { Image } from '../../models/dataset';
import { addImages } from '../../redux/actions/datasets';
// import { addImages } from '../../redux/actions/datasets';

const useStyles = makeStyles(() => ({
  header: {
    borderBottom: '1px solid #e7e8e8',
    height: '5rem',
    '& > h1': {
      margin: '.8rem 1rem 1.3rem .5rem',
    },
  },
  container: {
    height: 'calc(100vh - 5rem - 62px)',
  },
  details: {
    padding: '2rem',
    width: '80%',
    overflowY: 'auto',
  },
  subContainer: {
    background: 'white',
    padding: '1rem',
    marginBottom: '2rem',
  },
  imagePreview: {
    width: '100%',
    maxWidth: '20%',
    padding: '.5rem',
  },
  processOption: {
    width: '49%',
    background: 'white',
    padding: '1rem',
  },
  button: {
    border: '1px solid #b7b7b7',
    background: '#EBEBEB',
    padding: '3px 10px',
  },
}));

interface RouteMatchParams {
  id: string;
}
export default function Detail(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const datasets = useSelector<ReduxStoreType, DataSetState>((s) => s.datasets);
  const [open, setIsOpen] = useState<boolean>(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    params: { id },
  } = useRouteMatch<RouteMatchParams>();

  const handleChooseFiles = () => {
    if (fileInput !== null) {
      fileInput.current?.click();
    }
  };

  const readFileAsDataURL = (file: Blob, name: string): Promise<Image> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader && reader.result) {
          res({
            name,
            src: reader.result as string,
            regions: [],
          });
        }
      };
      reader.onerror = () => {
        rej(reader);
      };
      reader.readAsDataURL(file);
    });

  const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
    const readers = [];
    const { files } = e.target;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsDataURL(files[i], files[i].name));
      }
    }
    Promise.all(readers).then((values) => dispatch(addImages({ id: Number(id), images: values })));
    e.preventDefault();
  };

  const closeModal = () => setIsOpen(false);
  return (
    <div className={classes.details}>
      <div className={classes.subContainer}>
        <Typography fontWeight={500} fontSize={1.25} interactive>
          {datasets[Number(id)]?.name}
        </Typography>
        <Typography>
          {datasets[Number(id)]?.images.length > 1
            ? `${datasets[Number(id)]?.images.length} images`
            : `${datasets[Number(id)]?.images.length} image`}
        </Typography>
      </div>
      <div className={classes.subContainer}>
        <Grid justifyContent="space-between" alignItems="center">
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Images
          </Typography>
          <input
            id="logo"
            type="file"
            style={{ display: 'none' }}
            ref={fileInput}
            multiple
            accept=".jpg, .png, .jpeg"
            onChange={handleChangeImages}
          />
          <button
            className={classes.button}
            onClick={handleChooseFiles}
            type="button"
          >
            Add More Images
          </button>
        </Grid>
        <div>
          <AnnotableImages
            handleClick={() => setIsOpen(true)}
            images={datasets[Number(id)]?.images ?? []}
          />
        </div>
      </div>
      <Grid justifyContent="space-between">
        <div className={classes.processOption}>
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Preprocessing Options
          </Typography>
          <Typography>Applied to all images</Typography>
          <hr/>
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Auto-Orient
          </Typography>
          <Typography fontWeight={500} color="red">
            Remove
          </Typography>
          <hr/>
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Resize
          </Typography>
          <Typography fontWeight={500} color="red">
            Remove
          </Typography>
          <hr/>
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Grayscale
          </Typography>
          <Typography fontWeight={500} color="red">
            Remove
          </Typography>
        </div>
        <div className={classes.processOption}>
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Augmentation Options
          </Typography>
          <Typography>Applied to all images</Typography>
          <hr/>
          <Typography fontWeight={500} fontSize={1.25} interactive>
            Flip
          </Typography>
          <Typography fontWeight={500} color="red">
            Remove
          </Typography>
        </div>
      </Grid>
      <Popup
        contentStyle={{ width: '80%', height: '80%' }}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <Annotation
          images={datasets[Number(id)]?.images}
          id={Number(id)}
          onExit={() => setIsOpen(false)}
        />
      </Popup>
    </div>
  );
}
