import type PositionSetterOptions from '../types/PositionSetterOptions';
import type { ContextMenuOptionsCurrentPosition } from '@/features/ContextMenu/types/ContextMenuOptions';

interface Options
  extends PositionSetterOptions,
    Exclude<ContextMenuOptionsCurrentPosition, 'stickOn'> {}

export default function setCoordinatesByCurrentElement(
  event: MouseEvent,
  options: Options
) {
  // eslint-disable-next-line prefer-const
  let { width, height, coordinates, align, padX, padY, inset } = options;

  inset = inset || 24;
  padX = padX || inset;
  padY = padY || inset;

  const element = event.target as HTMLElement;
  const elementCoordinates = element.getBoundingClientRect();
  const centerX = elementCoordinates.left + elementCoordinates.width / 2;
  const centerY = elementCoordinates.top + elementCoordinates.height / 2;

  let left: number;
  let top: number;

  // centering x-axis
  if (width + elementCoordinates.left >= window.innerWidth) {
    left = centerX - width;
  } else {
    left = centerX;
  }

  // centering y-axis
  if (height + centerY >= window.innerHeight) {
    top = centerY - height;
  } else {
    top = centerY;
  }

  // aligning
  if (align === 'start') {
    left = elementCoordinates.left;
  } else if (align === 'end') {
    left = elementCoordinates.right - width;
  }

  // setting
  if (left + width >= window.innerWidth) {
    coordinates.left = left - width + elementCoordinates.width;
  } else {
    coordinates.left = left + (padX || 15);
  }

  coordinates.top = top + (padY || 15);
}
