import Init from './scripts/'
import './styles/index.scss'

import type {DirectiveBinding} from "vue";

type TextContent = 'string'

Init();

export default function (el: HTMLElement, binding: DirectiveBinding<TextContent>) {
    el.setAttribute('data-tooltip', binding.value);

    if (binding.modifiers.right) {
        el.setAttribute('data-position', 'right center')
    } else if (binding.modifiers.left) {
        el.setAttribute('data-position', 'left center')
    } else if (binding.modifiers.bottom) {
        el.setAttribute('data-position', 'center bottom')
    } else if (binding.modifiers.top_left) {
        el.setAttribute('data-position', 'left top')
    } else if (binding.modifiers.bottom_left) {
        el.setAttribute('data-position', 'left bottom')
    }

    //Todo: Automatize directive modifiers
}