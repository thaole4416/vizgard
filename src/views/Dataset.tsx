import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import Detail from '../components/datasets/Detail';
import { Route, Switch, useRouteMatch } from 'react-router';
import Sidebar from '../components/datasets/Sidebar';
import Grid from '../components/common/Grid';
import Header from '../components/datasets/Header';
import Create from '../components/datasets/Create';
import Edit from '../components/datasets/Edit';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: theme.color.secondary,
  },
  main: {
    height: 'calc(100vh - 5rem - 62px)',
  },
  list: {
    paddingBottom: '1rem',
    width: '80%',
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

export default function DatasetView(): ReactElement {
  const classes = useStyles();
  const match = useRouteMatch();
  return (
    <div className={classes.container}>
      <main>
        <Header/>
        <Grid className={classes.main}>
          <Sidebar/>
          <Switch>
            <Route path={`${match.url}/edit/:id`} component={Edit}/>
            <Route path={`${match.url}/:id`} component={Detail}/>
            <Route exact path={`${match.url}`} component={Create}/>
          </Switch>
        </Grid>
      </main>
    </div>
  );
}
