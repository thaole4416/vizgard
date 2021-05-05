import { ReactElement } from 'react';
import Client from '../components/client/Client';
import { makeStyles } from '@material-ui/styles';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: theme.color.secondary,
    },
}));
export default function HomeView(): ReactElement {
    const classes = useStyles();
    return (
      <div className={classes.container}>
        <Client/>
      </div>
    );
}
