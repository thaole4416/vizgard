import { makeStyles } from '@material-ui/styles';
import { ReactElement } from 'react';
import theme from '../../styles/theme';

const useStyles = makeStyles(() => ({
    footer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        textAlign: 'right',
        marginLeft: 'auto',
        marginRight: '20px',
        height: '24px',
        background: theme.color.secondary,
        padding: '16px',
        lineHeight: 0,
    },
}));
export default function Footer(): ReactElement {
    const classes = useStyles();
    return <footer className={classes.footer}>Client V0.1.0</footer>;
}
