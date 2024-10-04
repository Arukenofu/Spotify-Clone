import type {HTMLElementWithProps} from "@/app/directives/Tooltip/types/HTMLElementWithProps";
import type {TooltipProps} from "@/app/directives/Tooltip/types/TooltipProps";
import type {Ref} from "vue";

export default function (
    el: HTMLElementWithProps,
    isShown: Ref<boolean>,
    props: Ref<TooltipProps | {}>,
) {
    isShown.value = true;
    props.value = el.tooltipProps;
}