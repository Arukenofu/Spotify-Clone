/**
 * @original-author Zoltan Toth
 * @modified-by Bauyrzhan Alkenov
 */
import type {TooltipX, TooltipY} from "@/app/directives/Tooltip/types/Axis";

export default function (
    target: HTMLElementWithTooltip,
) {
    const showDelay: number = Number(target.dataset.showDelay) || 500;
    const unShowDelay: number = Number(target.dataset.unShowDelay) || 10;

    const existingTooltips = document.querySelectorAll('.tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());

    const tooltip = document.createElement('div');
    tooltip.className = "tooltip";
    tooltip.textContent = target.getAttribute('data-tooltip')!;
    document.body.append(tooltip);

    const position = target.dataset.position || 'center top';
    const [horizontalPosition, verticalPosition] = position.split(" ") as [TooltipX, TooltipY];

    setElementPosition(target, tooltip, horizontalPosition, verticalPosition);

    setTimeout(() => {
        tooltip.classList.add('show');
    }, showDelay);

    target.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove()
        }, unShowDelay);
    }, { once: true });

    document.body.addEventListener('mouseenter', () => {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove()
        }, unShowDelay);
    }, { once: true });
}

function setElementPosition(
    parentElement: HTMLElementWithTooltip,
    tooltip: HTMLElement,
    horizontalPosition: TooltipX,
    verticalPosition: TooltipY
) {
    const distance = Number(parentElement.dataset.distance) || 10;
    let left: number;
    let top: number;

    const parentCoordinates = parentElement.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const documentWidth = document.documentElement.clientWidth;

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

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top + scrollY}px`;
}