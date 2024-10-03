import type {Axes, HorizontalAxis, VerticalAxis} from "@/app/directives/Tooltip/types/Axes";
import type {DirectiveBinding} from "vue";

export interface BindingObject {
    content: string | null,
    showDelay?: number,
    unShowDelay?: number,
    distance?: number,
    allowInnerHTML?: boolean,
    placement?: [HorizontalAxis, VerticalAxis] | [HorizontalAxis] | [],
}
export type BindingValues = BindingObject | string;

export type Bindings = DirectiveBinding<BindingValues, Axes>