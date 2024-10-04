import type {Tooltip} from "@/app/directives/Tooltip/index";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        vTooltip: typeof Tooltip
    }
}

export {}