import { ref } from 'vue';
import { getOptions } from '../helpers/getOptions';
import { getCoordinatesByCurrentElement } from '../helpers/getCoordinatesByCurrentElement';
import { getCoordinatesByMousePosition } from '../helpers/getCoordinatesByMousePosition';
import type { ComposableOptions, FuncOptions } from '../types/FuncOptions';

export function useContextMenu(defaultOptions?: Partial<ComposableOptions>) {
  const isActive = ref<boolean>(false);

  function getWidth() {
    if (defaultOptions?.design === 'default') {
      return 350;
    } else if (defaultOptions?.design === 'minimal') {
      return 175;
    } else {
      return 350;
    }
  }

  const coordinates = ref<{top: number, left: number}>({
    top: 0,
    left: 0
  });

  function showContextMenu(event: MouseEvent, options: Partial<FuncOptions> = {}) {
    const opts = {
      ...getOptions(options, defaultOptions),
      contextMenuWidth: getWidth(),
      contextMenuHeight: (event.target as HTMLElement).offsetHeight
    };

    if (opts.stickOn === 'currentElement') {
      coordinates.value = getCoordinatesByCurrentElement(event, opts);
    } else if (opts.stickOn === 'mousePosition') {
      coordinates.value = getCoordinatesByMousePosition(event, opts);
    }

    isActive.value = true;
  }

  function hideContextMenu() {
    coordinates.value = {
      top: 0,
      left: 0
    };

    isActive.value = false;
  }

  function toggleContextMenu(event: MouseEvent, options: Partial<FuncOptions> = {}) {
    const opts = getOptions(options, defaultOptions);

    console.log('asd');

    isActive.value ? hideContextMenu() : showContextMenu(event, opts);
  }

  return {
    isActive,
    coordinates,
    showContextMenu,
    hideContextMenu,
    toggleContextMenu,
    getWidth
  }
}