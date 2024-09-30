import type {Ref} from "vue";
import { Router } from 'vue-router'
import type {TooltipX, TooltipY} from './directives/Tooltip/types/Axis'
import type {TooltipOptions} from "@/app/directives/Tooltip/types/TooltipOptions";

declare global {
    interface Window {
        tempTitle: string;
    }

    interface HTMLElementWithTooltip extends HTMLElement {
        dataset: {
            tooltip: string,
            position: `${TooltipX} ${TooltipY}`
        } & {[key in keyof TooltipOptions]: string}
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $router: Router,
        layoutScrollY: Ref<number>,
    }
}

export {}