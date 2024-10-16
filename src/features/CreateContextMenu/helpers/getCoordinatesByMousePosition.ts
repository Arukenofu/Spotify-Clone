import type {FuncOptions} from "@/features/CreateContextMenu/types/FuncOptions";

export function getCoordinatesByMousePosition(
  event: MouseEvent,
  options: FuncOptions
) {
  const { contextMenuWidth, contextMenuHeight } = options;
  const coordinates = {
    top: 0,
    left: 0
  }

  const mousePosition = {
    x: event.pageX,
    y: event.pageY
  };

  if (mousePosition.x + contextMenuWidth >= window.innerWidth + window.scrollX) {
    coordinates.left = mousePosition.x - contextMenuWidth;
  } else {
    coordinates.left = mousePosition.x;
  }

  if (mousePosition.y + contextMenuHeight >= window.innerHeight + window.scrollY) {
    coordinates.top = mousePosition.y - contextMenuHeight;

    if (coordinates.top < window.scrollY) {
      coordinates.top = window.innerHeight + window.scrollY - contextMenuHeight;
    }
  } else {
    coordinates.top = mousePosition.y;
  }

  return coordinates
}