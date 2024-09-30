import onMouseOver from './scripts/'
import './styles/index.scss'
import {type DirectiveBinding} from "vue";
import type {TooltipX, TooltipY} from "@/app/directives/Tooltip/types/Axis";
import type {TooltipOptions} from "@/app/directives/Tooltip/types/TooltipOptions";

type BindingValue = TooltipOptions & { text: string } | string;

type Bindings = DirectiveBinding<BindingValue, `${TooltipX}_${TooltipY}`>

export default function (el: HTMLElement, binding: Bindings) {
    if (typeof binding.value === 'string') {
        el.setAttribute('data-tooltip', binding.value);
    } else if (typeof binding.value === 'object') {
        const {text, showDelay, unShowDelay, distance} = binding.value;

        el.setAttribute('data-tooltip', text);
        showDelay && el.setAttribute('data-showDelay', String(showDelay))
        unShowDelay && el.setAttribute('data-showDelay', String(unShowDelay))
        distance && el.setAttribute('data-distance', String(distance))
    }

    const modifier = getModifierParam(binding.modifiers);

    if (modifier) {
        el.setAttribute(
            'data-position',
            `${modifier[0] || 'top'} ${modifier[1] || 'center'}`
        );
    }

    el.addEventListener('mouseover', (event: MouseEvent) => {
        const target = event.target as HTMLElementWithTooltip;
        if (!target.hasAttribute('data-tooltip')) return;
        onMouseOver(target);
    })
}

function getModifierParam(value: Bindings['modifiers']) {
    return Object.keys(value)[0]?.split('_');
}