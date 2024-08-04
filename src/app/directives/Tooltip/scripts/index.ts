/**
 * @original-author Zoltan Toth
 * @modifyed-by Bauyrzhan Alkenov
 */

export default function () {
    const showDelay = 500;
    const unShowDelay = 10;
    const distance = 10;

    document.body.addEventListener('mouseenter', (event) => {
        const target = event.target as HTMLElement;

        if (!target.hasAttribute('data-tooltip')) {
            return;
        }

        const existingTooltips = document.querySelectorAll('.tooltip');
        existingTooltips.forEach(tooltip => tooltip.remove());

        const tooltip = document.createElement('div');
        tooltip.className = "tooltip";
        tooltip.innerHTML = target.getAttribute('data-tooltip')!;

        document.body.append(tooltip);

        const position = target.getAttribute('data-position') || 'center top';
        const [horizontalPosition, verticalPosition] = position.split(" ");

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
        // Todo: Fix mouseleave event when transforming element
    }, true);

    function setElementPosition(
        parentElement: HTMLElement,
        tooltip: HTMLElement,
        horizontalPosition: string,
        verticalPosition: string
    ) {
        const parentCoordinates = parentElement.getBoundingClientRect();
        let left: number;
        let top: number;

        switch (horizontalPosition) {
            case "left": {
                left = parentCoordinates.left - distance - tooltip.offsetWidth;
                if (parentCoordinates.left - tooltip.offsetWidth < 0) {
                    left = distance;
                }
                break;
            }

            case "right": {
                left = parentCoordinates.right + distance;
                if (parentCoordinates.right + tooltip.offsetWidth > document.documentElement.clientWidth) {
                    left = document.documentElement.clientWidth - tooltip.offsetWidth - distance;
                }
                break;
            }

            default:
            case "center":
                left = parentCoordinates.left + ((parentElement.offsetWidth - tooltip.offsetWidth) / 2);
        }

        switch (verticalPosition) {
            case "center":
                top = (parentCoordinates.top + parentCoordinates.bottom) / 2 - tooltip.offsetHeight / 2;
                break;

            case "bottom":
                top = parentCoordinates.bottom + distance;
                break;

            default:
            case "top":
                top = parentCoordinates.top - tooltip.offsetHeight - distance;
        }

        left = (left < 0) ? parentCoordinates.left : left;
        top  = (top < 0) ? parentCoordinates.bottom + distance : top;

        // For cross-browser support
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        tooltip.style.left = left + "px";
        tooltip.style.top  = top + scrollY + "px";
    }
}