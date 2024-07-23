import type {DirectiveBinding} from "vue";

type TooltipOptions = {
    text: string,
    position?: 'top' | 'bottom';
} | 'string'

export default function (el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
    let text;
    let position;

    if (typeof binding.value === 'string') {
        text = binding.value;
        position = 'top';
    } else {
        text = binding.value.text;
        position = binding.value.position;
    }

    el.setAttribute('data-tooltip', text);
    el.classList.add('with-tooltip');

    el.classList.add(`tooltip--${position}`);
}