import { makeStyles } from '@material-ui/styles';
import { ReactElement, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  fontSize?: number;
  color?: string;
  children: string;
  interactive?: boolean;
}

const useStyles = makeStyles(() => ({
  root: ({
    fontWeight,
    fontSize,
    color,
  }: Pick<TypographyProps, 'fontSize' | 'fontWeight' | 'color'>) => ({
    fontWeight,
    color,
    fontSize: `${fontSize}rem`,
  }),
  interactive: {
    cursor: 'pointer',
  },
}));

export default function Typography({
  fontWeight,
  fontSize,
  color,
  children,
  interactive,
  ...props
}: TypographyProps): ReactElement {
  const classes = useStyles({ fontWeight, fontSize, color });
  return <p {...props} className={clsx(classes.root, interactive && classes.interactive)}>{children}</p>;
}

Typography.defaultProps = {
  interactive: false,
  color: 'black',
  fontSize: 1,
  fontWeight: 0,
};
