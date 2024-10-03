import type {TooltipProps} from "@/app/directives/Tooltip/types/TooltipProps";
import type {Tooltip} from "@/app/directives/Tooltip/index";

declare global {
    interface HTMLElement {
        tooltipProps: TooltipProps
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        vTooltip: typeof Tooltip
    }
}

export {}