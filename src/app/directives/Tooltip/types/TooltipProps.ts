import type {BindingObject} from "@/app/directives/Tooltip/types/BindingTypes";

export interface TooltipProps extends BindingObject {
    isShown?: boolean,
    parent?: HTMLElement
}