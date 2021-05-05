import { makeStyles } from '@material-ui/styles';
import { ReactElement, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface GridProps extends HTMLAttributes<HTMLDivElement>{
  justifyContent?:
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'baseline';
  alignItems?:
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'baseline';
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: ({ justifyContent, alignItems }: Omit<GridProps, 'children'>) => ({
    display: 'flex',
    justifyContent,
    alignItems,
  }),
  interactive: {
    cursor: 'pointer',
  },
}));

export default function Grid({
  justifyContent,
  className,
  alignItems,
  children,
  ...props
}: GridProps): ReactElement {
  const classes = useStyles({ justifyContent, alignItems });
  return <div {...props} className={clsx(classes.root, className)}>{children}</div>;
}

Grid.defaultProps = {
  justifyContent: '',
  alignItems: '',
  className: '',
};
