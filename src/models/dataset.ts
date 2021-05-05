interface Region {
  cls: string;
  color: string;
}
interface RectRegion extends Region {
  w: number;
  h: number;
  x: number;
  y: number;
  type: 'box';
}
interface PolygonRegion extends Region {
  type: 'polygon';
  points: Array<[number, number]>;
}
export interface Image {
  name: string;
  src: string;
  regions: Array<RectRegion | PolygonRegion>;
}
export interface DataSet {
  name: string;
  images: Array<Image>;
}
