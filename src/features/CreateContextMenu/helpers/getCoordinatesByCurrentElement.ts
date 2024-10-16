import type {FuncOptions} from "@/features/CreateContextMenu/types/FuncOptions";

export function getCoordinatesByCurrentElement(
  event: MouseEvent,
  options: FuncOptions
) {
  // eslint-disable-next-line prefer-const
  let { contextMenuWidth, contextMenuHeight, align, padX, padY, inset } = options;

  const coordinates = {
    top: 0,
    left: 0
  };

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
  if (contextMenuWidth + elementCoordinates.left >= window.innerWidth) {
    left = centerX - contextMenuWidth;
  } else {
    left = centerX;
  }

  // centering y-axis
  if (contextMenuHeight + centerY >= window.innerHeight) {
    top = centerY - contextMenuHeight;
  } else {
    top = centerY;
  }

  // aligning
  if (align === 'start') {
    left = elementCoordinates.left;
  } else if (align === 'end') {
    left = elementCoordinates.right - contextMenuWidth;
  }

  // setting
  if (left + contextMenuWidth >= window.innerWidth) {
    coordinates.left = left - contextMenuWidth + elementCoordinates.width;
  } else {
    coordinates.left = left + padX;
  }

  coordinates.top = top + padY;

  return coordinates
}
