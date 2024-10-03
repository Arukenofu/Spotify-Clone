import type {HorizontalAxis, VerticalAxis} from "../types/Axes";
import type {Bindings} from "@/app/directives/Tooltip/types/BindingTypes";

export default function(value: Bindings['modifiers']): [HorizontalAxis, VerticalAxis] {
    return Object.keys(value)[0]?.split('_') as [HorizontalAxis, VerticalAxis];
}