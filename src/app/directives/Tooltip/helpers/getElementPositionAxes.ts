import type {TooltipProps} from "@/app/directives/Tooltip/types/TooltipProps";

export default function(
    parentElement: HTMLElement,
    tooltip: HTMLElement,
    placement: TooltipProps['placement'] = [],
    distanceParam: number
): [number, number] {
    const distance = distanceParam || 10;
    let left: number;
    let top: number;

    const parentCoordinates = parentElement.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const documentWidth = document.documentElement.clientWidth;

    const [horizontalPosition, verticalPosition] = placement;

    switch (horizontalPosition) {
        case "left": {
            left = parentCoordinates.left - distance - tooltipWidth;
            if (parentCoordinates.left - tooltipWidth < 0) {
                left = distance;
            }
            break;
        }
        case "right": {
            left = parentCoordinates.right + distance;
            if (parentCoordinates.right + tooltipWidth > documentWidth) {
                left = documentWidth - tooltipWidth - distance;
            }
            break;
        }
        case "start": {
            left = parentCoordinates.left;
            break;
        }
        case "end": {
            left = parentCoordinates.right - tooltipWidth;
            break;
        }
        default:
        case "center": {
            left = parentCoordinates.left + (parentElement.offsetWidth - tooltipWidth) / 2;
            break;
        }
    }

    switch (verticalPosition) {
        case "center": {
            top = (parentCoordinates.top + parentCoordinates.bottom) / 2 - tooltipHeight / 2;
            break;
        }
        case "bottom": {
            top = parentCoordinates.bottom + distance;
            break;
        }
        case "start": {
            top = parentCoordinates.top;
            break;
        }
        case "end": {
            top = parentCoordinates.bottom - tooltipHeight;
            break;
        }
        default:
        case "top": {
            top = parentCoordinates.top - tooltipHeight - distance;
            break;
        }
    }

    left = (left < 0) ? parentCoordinates.left : left;
    top = (top < 0) ? parentCoordinates.bottom + distance : top;

    const scrollY = document.body.scrollTop || 0;

    return [left, top + scrollY]
}