import { ReactElement, useState, FormEvent, ChangeEvent, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { createDataset } from '../../redux/actions/datasets';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  container: {
    width: '80%',
  },
  button: {
    border: '1px solid #b7b7b7',
    background: '#EBEBEB',
    padding: '3px 10px',
  },
  label: {
    width: 100,
  },
  input: {
    width: 250,
  },
  imagesPreview: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  imagePreview: {
    width: '100%',
    maxWidth: '20%',
    padding: '.5rem',
  },
  fileInput: {
    display: 'none',
  },
}));
export default function Create(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const handleChooseFiles = () => {
    if (fileInput !== null) {
      fileInput.current?.click();
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageToAdd = images.map((src, i) => ({ name: `Image ${i + 1}`, src, regions: [] }));
    dispatch(createDataset({ name, images: imageToAdd }));
    history.push('/datasets');
  };
  const readFileAsDataURL = (file: Blob): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader && reader.result) {
          res(reader.result as string);
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
        readers.push(readFileAsDataURL(files[i]));
      }
    }
    Promise.all(readers).then((values) => setImages(values));
    e.preventDefault();
  };
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <div className="m-3">
        <label htmlFor="name" className={classes.label}>
          Name
        </label>
        <input
          id="name"
          className={classes.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="m-3">
        <label htmlFor="logo" className={classes.label}>
          Images
        </label>
        <input
          id="logo"
          type="file"
          className={classes.fileInput}
          ref={fileInput}
          multiple
          accept=".jpg, .png, .jpeg"
          onChange={handleChangeImages}
        />
        <button
          type="button"
          className={classes.button}
          onClick={handleChooseFiles}
        >
          Choose Images
        </button>
        <div className={classes.imagesPreview}>
          {images.map((src, i) => (
            <img
              key={`image-${i + 1}`}
              alt=""
              src={src}
              className={clsx(classes.imagePreview, 'interactive')}
            />
          ))}
        </div>
      </div>
      <button type="submit" className={clsx(classes.button, 'm-3')}>
        Create
      </button>
    </form>
  );
}
