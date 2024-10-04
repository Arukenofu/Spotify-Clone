import type {HTMLElementWithProps} from "@/app/directives/Tooltip/types/HTMLElementWithProps";
import type {Ref} from "vue";
import type {TooltipProps} from "@/app/directives/Tooltip/types/TooltipProps";

export default function (
    el: HTMLElementWithProps,
    isShown: Ref<boolean>,
    props: Ref<TooltipProps | {}>,
) {
    isShown.value = false;

    props.value = {};
}