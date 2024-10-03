import type {TooltipProps} from "@/app/directives/Tooltip/types/TooltipProps";

export interface HTMLElementWithProps extends HTMLElement {
    tooltipProps: TooltipProps
}