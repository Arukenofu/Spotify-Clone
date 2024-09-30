import {type Component, nextTick, shallowRef} from "vue";
import contextMenuStore from "@/features/ContextMenu/store/contextMenuStore";
import setCoordinatesByMousePosition from "@/features/ContextMenu/utils/setCoordinatesByMousePosition";
import setCoordinatesByCurrentElement from "@/features/ContextMenu/utils/setCoordinatesByCurrentElement";
import type {ContextMenuOptions} from "@/features/ContextMenu/types/ContextMenuOptions";

export default async function showContextMenu(
    event: MouseEvent,
    value: Component,
    options?: ContextMenuOptions
): Promise<void> {
    event.preventDefault();

    const {
        core,
        isActive,
        setContextMenuComponent
    } = contextMenuStore();

    const coordinates = {
        top: 0,
        left: 0
    }

    setContextMenuComponent(shallowRef(value));
    isActive.value = true;

    await nextTick();

    const width = options?.design === 'default' ? 350 : 175;
    const height = core.value!.offsetHeight;

    if (options?.stickOn === 'mousePosition') {
        setCoordinatesByMousePosition(event, {
            coordinates,
            width,
            height
        });
    }
    else if (options?.stickOn === 'currentElement') {
        setCoordinatesByCurrentElement(event, {
            coordinates,
            width,
            height,
            ...options
        });
    }

    const styles = {
        width: `${width}px`,
        top: coordinates.top + 'px',
        left: coordinates.left + 'px',
    }

    core.value!.style.minWidth = styles.width;
    core.value!.style.top = styles.top;
    core.value!.style.left = styles.left;
}

