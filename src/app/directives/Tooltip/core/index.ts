import '../styles/index.scss';

import {createApp, type DirectiveBinding, h, ref} from "vue";
import TooltipDirectiveComponent from "../component/TooltipDirectiveComponent.vue";
import getOptions from "@/app/directives/Tooltip/helpers/getOptions";

import type {App, Ref} from "vue";
import type {Bindings, BindingValues} from "@/app/directives/Tooltip/types/BindingTypes";
import type {HTMLElementWithProps} from "@/app/directives/Tooltip/types/HTMLElementWithProps";
import type {TooltipProps} from "@/app/directives/Tooltip/types/TooltipProps";
import onMouseOver from "@/app/directives/Tooltip/events/onMouseOver";
import onMouseLeave from "@/app/directives/Tooltip/events/onMouseLeave";

let directiveApp: App;
let props: Ref<TooltipProps>;
let isShown: Ref<boolean>;

function createDirectiveApplication() {
    if (directiveApp) return;
    isShown = ref(false);
    props = ref({
        content: null
    });

    directiveApp = createApp({
        name: 'v-tooltip-directive-app',
        setup() {
            return {
                isShown,
                props
            }
        },
        render () {
            return h(TooltipDirectiveComponent, {
                isShown: this.isShown,
                ...this.props,
            })
        },
        devtools: {
            hide: true
        }
    });

    const mountTarget = document.createElement('div');
    document.body.appendChild(mountTarget);

    directiveApp.mount(mountTarget);
}

function setTooltipParent(
    el: HTMLElementWithProps,
    value: DirectiveBinding['value'],
    modifiers: DirectiveBinding['modifiers']
) {
    createDirectiveApplication();

    el.tooltipProps = getOptions(el, value, modifiers);

    el.addEventListener('mouseover', () => {
        onMouseOver(el, isShown, props);
    });
    el.addEventListener('mouseleave', () => {
        onMouseLeave(el, isShown, props);
    });
}

function destroyTooltip(el: HTMLElementWithProps) {
    el.removeEventListener('mouseover', () => {
        onMouseOver(el, isShown, props);
    });
    el.removeEventListener('mouseleave', () => {
        onMouseLeave(el, isShown, props);
    });
}

function bind(
    el: HTMLElementWithProps,
    {value, modifiers}: {value: BindingValues, modifiers: Bindings['modifiers']}
) {
    const options = getOptions(el, value, modifiers);
    if (!options.content) {
        destroyTooltip(el); return;
    }

    setTooltipParent(el, value, modifiers);
}

export default {
    beforeMount: bind,
    update: bind,
    beforeUnmount(el: HTMLElementWithProps) {
        destroyTooltip(el);
    }
}
