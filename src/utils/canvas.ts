interface DrawReactParams {
  context: CanvasRenderingContext2D;
  singleTracking: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

export function drawRect({
  context,
  singleTracking,
  x,
  y,
  w,
  h,
}: DrawReactParams): void {
  context.beginPath();
  context.strokeStyle = singleTracking ? '#ffa500' : '#50ff00';
  context.lineWidth = 2;
  context.rect(x, y, w, h);
  context.stroke();
}
