import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { DataSetState, ReduxStoreType } from '../../models/reduxStore';
import { deleteDataset } from '../../redux/actions/datasets';
import theme from '../../styles/theme';
import Grid from '../common/Grid';
import Typography from '../common/Typography';
import Create from './Create';
import Sidebar from './Sidebar';

const useStyles = makeStyles(() => ({
  container: {
    height: 'calc(100vh - 5rem - 62px)',
  },
  header: {
    borderBottom: '1px solid #e7e8e8',
    height: '5rem',
    '& > h1': {
      margin: '.8rem 1rem 1.3rem .5rem',
    },
  },
  button: {
    border: 'none',
    background: theme.color.primary,
    color: theme.color.white,
    padding: '3px 10px',
    marginLeft: 'auto',
  },
  list: {
    paddingBottom: '1rem',
    width: '80%',
    overflowY: 'auto',
  },
  listItem: {
    display: 'flex',
    background: theme.color.white,
    margin: '1.5rem',
    padding: '1rem',
    borderRadius: 10,
  },
  text: {
    flex: 1,
  },
  image: {
    width: '250px',
  },
}));

export default function DataSets(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const datasets = useSelector<ReduxStoreType, DataSetState>((s) => s.datasets);
  const handleRenameDataset = (id: number): void => {
    history.push(`/dataset/edit/${id}`);
  };
  const handleDeleteDataset = (id: number): void => {
    dispatch(deleteDataset(id));
  };

  useEffect(() => {
    setIsCreate(false);
  }, [datasets]);
  return (
    <main className={classes.container}>
      <header className={clsx(classes.header)}>
        <h1>DataSets</h1>
        <button
          type="button"
          className={classes.button}
          onClick={() => history.push('/dataset/')}
        >
          Create New
        </button>
      </header>
      <Grid className={classes.container}>
        <Sidebar/>
        {isCreate ? <Create/> : (
          <section className={classes.list}>
            {datasets.map((ds, i) => (
              <div key={`ds-${i + 1}`} className={classes.listItem}>
                <div className={classes.text}>
                  <Typography
                    onClick={() => history.push(`/dataset/${i}`)}
                    fontWeight={500}
                    fontSize={1.25}
                    interactive
                  >
                    {ds.name}
                  </Typography>
                  <p>
                    <span className="interactive" onClick={() => handleRenameDataset(i)}>Rename</span> |{' '}
                    <span onClick={() => handleDeleteDataset(i)} style={{ color: 'red' }} className="interactive">
                      Delete
                    </span>
                  </p>
                  <Typography>
                    {ds.images.length > 1
                      ? `${ds.images.length} images`
                      : `${ds.images.length} image`}
                  </Typography>
                </div>
                <img
                  alt=""
                  src={ds.images[0].src ?? 'https://picsum.photos/1920/1080'}
                  className={classes.image}
                />
              </div>
            ))}
          </section>
        )}
      </Grid>
    </main>
  );
}
