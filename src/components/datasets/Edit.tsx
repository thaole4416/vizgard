import { ReactElement, useState, FormEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { renameDataset } from '../../redux/actions/datasets';

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
export default function Edit(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(renameDataset({ index: Number(id), name }));
    history.push('/datasets');
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
      <button type="submit" className={clsx(classes.button, 'm-3')}>
        Edit
      </button>
    </form>
  );
}
