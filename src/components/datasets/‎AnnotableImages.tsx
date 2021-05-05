import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactElement, useEffect } from 'react';
import { Image } from '../../models/dataset';

const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 180px)',
    gridTemplateRows: 'auto',
    gridGap: '0.5rem',
  },
  gridItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: 'auto',
    // height: '100%',
  },
}));

interface AnnotableImagesProps {
  images: Array<Image>;
  handleClick: () => void;
}

const drawBox = (
  context: CanvasRenderingContext2D,
  imageElem: HTMLImageElement,
  points: { w: number; h: number; x: number; y: number },
  color: string,
): void => {
  context.strokeStyle = color ?? 'red';
  context.fillStyle = `${color}2a` ?? 'red';
  context?.strokeRect(
    imageElem.offsetLeft + imageElem.width * points.x,
    imageElem.offsetTop + imageElem.height * points.y,
    imageElem.width * points.w,
    imageElem.height * points.h,
  );
  context?.fillRect(
    imageElem.offsetLeft + imageElem.width * points.x,
    imageElem.offsetTop + imageElem.height * points.y,
    imageElem.width * points.w,
    imageElem.height * points.h,
  );
};

const drawPolygon = (
  context: CanvasRenderingContext2D,
  imageElem: HTMLImageElement,
  points: Array<[number, number]>,
  color: string,
) => {
  context.strokeStyle = color ?? 'red';
  context.fillStyle = `${color}2a` ?? 'red';
  context.moveTo(
    imageElem.offsetLeft + points[0][0] * imageElem.width,
    imageElem.offsetTop + points[0][1] * imageElem.height,
  );
  points.forEach((p, i) => {
    if (i !== 0) {
      const [x, y] = p;
      context.lineTo(
        imageElem.offsetLeft + x * imageElem.width,
        imageElem.offsetTop + y * imageElem.height,
      );
    }
  });
  context.closePath();
  context.stroke();
  context.fill();
};

export default function AnnotableImages({
  images,
  handleClick,
}: AnnotableImagesProps): ReactElement {
  const classes = useStyles();

  const handleImageLoaded = (image: Image, i: number): void => {
    const imageElem: HTMLImageElement = document.querySelector(
      `#image-${i + 1}`,
    ) as HTMLImageElement;
    const canvasElem: HTMLCanvasElement = imageElem?.previousElementSibling as HTMLCanvasElement;
    const containerElem = imageElem?.parentElement;
    if (canvasElem && imageElem) {
      const context = canvasElem.getContext('2d');
      canvasElem.width = containerElem?.offsetWidth ?? 0;
      canvasElem.height = containerElem?.offsetHeight ?? 0;
      context?.beginPath();
      image.regions.forEach((region) => {
        if (region.type === 'box' && context) {
          drawBox(context, imageElem, region, region.color);
        } else if (region.type === 'polygon' && context) {
          drawPolygon(context, imageElem, region.points, region.color);
        }
      });
    }
  };

  useEffect(() => {
    images.forEach((image, i) => {
      const imageElem: HTMLImageElement = document.querySelector(
        `#image-${i + 1}`,
      ) as HTMLImageElement;
      const canvasElem: HTMLCanvasElement = imageElem?.previousElementSibling as HTMLCanvasElement;
      const containerElem = imageElem?.parentElement;
      if (canvasElem && imageElem) {
        const context = canvasElem.getContext('2d');
        canvasElem.width = containerElem?.offsetWidth ?? 0;
        canvasElem.height = containerElem?.offsetHeight ?? 0;
        context?.beginPath();
        image.regions.forEach((region) => {
          if (region.type === 'box' && context) {
            drawBox(context, imageElem, region, region.color);
          } else if (region.type === 'polygon' && context) {
            drawPolygon(context, imageElem, region.points, region.color);
          }
        });
      }
    });
  }, [images]);

  return (
    <div className={classes.grid}>
      {images.map((image, i) => (
        <div key={`image ${i + 1}`} className={classes.gridItem}>
          <canvas
            onClick={handleClick}
            className={clsx(classes.canvas, 'interactive')}
          />
          <img
            className={classes.img}
            src={image.src}
            alt=""
            id={`image-${i + 1}`}
            onLoad={() => handleImageLoaded(image, i)}
          />
        </div>
      ))}
    </div>
  );
}
