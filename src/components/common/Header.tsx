import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import theme from '../../styles/theme';

const useStyles = makeStyles(() => ({
  header: {
    background: theme.color.white,
  },
  navItem: {
    marginLeft: '60px',
    fontSize: '1.1em',
    padding: '2px 8px',
    color: theme.color.black,
    '&.active': {
      borderBottom: `5px solid ${theme.color.primary}`,
    },
    '&:hover': {
      textDecoration: 'none',
      color: theme.color.black,
    },
  },
}));
const navItems = [
  {
    id: 0,
    name: 'Client',
    link: '/',
  },
  {
    id: 1,
    name: 'Datasets',
    link: '/datasets',
  },
];
export default function Header(): ReactElement {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState<number>(0);
  useEffect(() => {
    if (window.location.pathname.includes('dataset')) {
      setActiveTab(1);
    }
  }, []);
  return (
    <header className={classes.header}>
      <img src={logo} height={50}/>
      {navItems.map((item) => (
        <Link
          key={item.id}
          className={clsx(classes.navItem, activeTab === item.id && 'active')}
          to={item.link}
          onClick={() => setActiveTab(item.id)}
        >
          {item.name}
        </Link>
      ))}
    </header>
  );
}
