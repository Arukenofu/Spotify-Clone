import type PositionSetterOptions from '../types/PositionSetterOptions';

interface Options extends PositionSetterOptions {}

export default function setCoordinatesByMousePosition(
  event: MouseEvent,
  options: Options
) {
  const { width, height, coordinates } = options;

  const mousePosition = {
    x: event.pageX,
    y: event.pageY
  };

  if (mousePosition.x + width >= window.innerWidth + window.scrollX) {
    coordinates.left = mousePosition.x - width;
  } else {
    coordinates.left = mousePosition.x;
  }

  if (mousePosition.y + height >= window.innerHeight + window.scrollY) {
    coordinates.top = mousePosition.y - height;

    if (coordinates.top < window.scrollY) {
      coordinates.top = window.innerHeight + window.scrollY - height;
    }
  } else {
    coordinates.top = mousePosition.y;
  }
}
