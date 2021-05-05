import { ReactElement } from 'react';
import ReactImageAnnotate from 'react-image-annotate';
import { useDispatch } from 'react-redux';
import { Image } from '../../models/dataset';
import { updateDataset } from '../../redux/actions/datasets';

interface AnnotationProps {
    images: Array<Image>;
    id: number;
    onExit: () => void;
}

export default function Annotation({ images, id, onExit } : AnnotationProps): ReactElement {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExit = (data: any) => {
    const annotations = data.images;
    dispatch(updateDataset({ id, images: annotations }));
    onExit();
  };
    return (
      <ReactImageAnnotate
        labelImages
        regionClsList={['']}
        images={images}
        onExit={handleExit}
      />
    );
}
