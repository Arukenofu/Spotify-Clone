import contextMenuStore from "@/features/ContextMenu/store/contextMenuStore";
import {type Component, nextTick, shallowRef} from "vue";
import type {Options} from '../types/Options'


export default async function showContextMenu(
    event: MouseEvent,
    value: Component,
    options?: Options
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

    isActive.value = true;
    setContextMenuComponent(shallowRef(value));
    await nextTick();

    const width = core.value!.offsetWidth;
    const height = core.value!.offsetHeight;

    if (options?.stickOn === 'mousePosition') {
        setCoordinatesByMousePosition(event, coordinates, width, height);
    } else {
        setCoordinatesByCurrentElement(event, coordinates, width, height);
    }

    const styles = {
        width: options?.style === 'default' ? '350px' : '175px',
        top: coordinates.top + 'px',
        left: coordinates.left + 'px',
    }

    core.value!.style.minWidth = styles.width;
    core.value!.style.top = styles.top;
    core.value!.style.left = styles.left;
}

function setCoordinatesByMousePosition(
    event: MouseEvent,
    coordinates: {top: number, left: number},
    width: number,
    height: number
) {
    if ((width + event.pageX) >= window.innerWidth) {
        coordinates.left = (event.pageX - width);
    } else {
        coordinates.left = event.pageX;
    }

    if ((height + event.clientY) >= window.innerHeight) {
        coordinates.top = event.pageY - height;
    } else {
        coordinates.top = event.pageY ;
    }
}

function setCoordinatesByCurrentElement(
    event: MouseEvent,
    coordinates: {top: number, left: number},
    width: number,
    height: number
) {
    const element = event.target as HTMLElement;
    const elementCoordinates = element.getBoundingClientRect();

    const centerX = elementCoordinates.left + elementCoordinates.width / 2;
    const centerY = elementCoordinates.top + elementCoordinates.height / 2;

    let left: number;
    let top: number;

    if ((width + elementCoordinates.left) >= window.innerWidth) {
        left = (centerX - width);
    } else {
        left = centerX;
    }

    if ((height + centerY) >= window.innerHeight) {
        top = centerY - height;
    } else {
        top = centerY;
    }

    coordinates.left = left;
    coordinates.top = top + 20;
}