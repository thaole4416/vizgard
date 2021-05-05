interface Theme {
    color: {
        primary: string;
        secondary: string;
        white: string;
        black: string;
    };
    breakpoints: {
        down: {
            sm: string;
            md: string;
        }
    }
}
export default Theme;
