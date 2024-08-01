import type {DirectiveBinding} from "vue";

type TextContent = 'string'

export default function (el: HTMLElement, binding: DirectiveBinding<TextContent>) {
    el.setAttribute('data-tooltip', binding.value);
    el.classList.add('with-tooltip');

    if (binding.modifiers?.bottom) {
        el.classList.add(`tooltip--bottom`);
    } else if (binding.modifiers.left) {
        el.classList.add(`tooltip--left`);
    } else if (binding.modifiers.right) {
        el.classList.add(`tooltip--right`);
    }
}