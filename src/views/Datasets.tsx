import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import DataSets from '../components/datasets/DataSets';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: theme.color.secondary,
    },
}));
export default function DatasetsView(): ReactElement {
    const classes = useStyles();
    return (
      <div className={classes.container}>
        <DataSets/>
      </div>
    );
}
