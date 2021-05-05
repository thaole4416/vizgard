import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '../common/Grid';

const useStyles = makeStyles(() => ({
  container: {
    width: '20%',
    borderRight: '1px solid #e7e8e8',
  },
  button: {
    border: '1px solid #b7b7b7',
    background: '#EBEBEB',
    padding: '3px 10px',
    display: 'block',
    width: '96%',
    margin: 'auto',
    marginTop: '1rem',
  },
}));
export default function Sidebar(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <div className={classes.container}>
      {pathname.search(/dataset$|dataset\//g) > 0 && (
        <button
          type="button"
          className={classes.button}
          onClick={() => history.goBack()}
        >
          <Grid justifyContent="center" alignItems="center">
            <ArrowBackIcon fontSize="small"/>
            Back to Datasets
          </Grid>
        </button>
      )}
    </div>
  );
}
