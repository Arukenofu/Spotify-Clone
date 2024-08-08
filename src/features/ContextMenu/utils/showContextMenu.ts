import contextMenuStore from "@/features/ContextMenu/store/contextMenuStore";
import {nextTick} from "vue";

import type {Tree} from "@/features/ContextMenu";
import type {Options} from "@/features/ContextMenu/types/Options";

export default async function showContextMenu(event: MouseEvent, value: Tree[], opts?: Options) {
    event.preventDefault();

    const {
        core,
        currentTree,
        isActive,
        options,
        coordinates
    } = contextMenuStore();

    options.value.style = opts?.style || 'default';
    options.value.stickOn = opts?.stickOn || 'mousePosition';

    isActive.value = true;
    currentTree.value = value;
    await nextTick();

    const width = core.value!.offsetWidth;
    const height = core.value!.offsetHeight;

    if (options.value.stickOn === 'mousePosition') {
        setCoordinatesByMousePosition(event, coordinates.value, width, height);
    } else {
        setCoordinatesByCurrentElement(event, coordinates.value, width, height);
    }
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