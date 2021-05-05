import Theme from '../models/theme';

const theme: Theme = {
    color: {
        primary: '#12EF8C',
        secondary: '#F4F6F8',
        white: 'white',
        black: 'black',
    },
    breakpoints: {
        down: {
            sm: '@media (max-width: 959.95px)',
            md: '@media (max-width: 1279.95px)',
        },
    },
};

export default theme;
