import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { DataSetState, ReduxStoreType } from '../../models/reduxStore';
import theme from '../../styles/theme';

const useStyles = makeStyles(() => ({
  container: {
    width: '20%',
    borderRight: '1px solid #e7e8e8',
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
}));

export default function Header(): ReactElement {
  const classes = useStyles();
  const datasets = useSelector<ReduxStoreType, DataSetState>((s) => s.datasets);
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  return (
    <header className={classes.header}>
      <h1>{datasets[Number(id)]?.name ?? 'Datasets'}</h1>
      {
       id && !pathname.includes('edit') && (
       <button
         type="button"
         className={classes.button}
       >
         Generate
       </button>
       )
     }
    </header>
  );
}
