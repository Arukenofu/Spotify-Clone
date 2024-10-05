import { createApp, h, ref } from 'vue';
import getOptions from '@/app/directives/Tooltip/helpers/getOptions';
import onMouseOver from '@/app/directives/Tooltip/events/onMouseOver';
import onMouseLeave from '@/app/directives/Tooltip/events/onMouseLeave';
import TooltipDirectiveComponent from '../component/TooltipDirectiveComponent.vue';
import type { App, Ref } from 'vue';
import type {
  Bindings,
  BindingValues
} from '@/app/directives/Tooltip/types/BindingTypes';
import type { HTMLElementWithProps } from '@/app/directives/Tooltip/types/HTMLElementWithProps';
import type { TooltipProps } from '@/app/directives/Tooltip/types/TooltipProps';
import '../styles/index.scss';

let directiveApp: App;
let props: Ref<TooltipProps | {}>;
let isShown: Ref<boolean>;

function createDirectiveApplication() {
  if (directiveApp) return;
  isShown = ref(false);
  props = ref({
    content: null
  });

  directiveApp = createApp({
    name: 'VTooltipDirectiveApp',
    setup() {
      return {
        isShown,
        props
      };
    },
    render() {
      return (
        this.isShown &&
        h(TooltipDirectiveComponent, {
          isShown: this.isShown,
          ...this.props
        })
      );
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
  value: BindingValues,
  arg: Bindings['arg']
) {
  createDirectiveApplication();

  el.tooltipProps = getOptions(el, value, arg);

  el.addEventListener('mouseover', () => {
    onMouseOver(el, isShown, props);
  });
  el.addEventListener('mouseleave', () => {
    onMouseLeave(el, isShown, props);
  });
}

export function bind(el: HTMLElementWithProps, binding: Bindings) {
  const { value, arg } = binding;

  const options = getOptions(el, value, arg);
  if (!options.content) {
    destroyTooltip(el);
    return;
  }

  setTooltipParent(el, value, arg);
}

export function destroyTooltip(el: HTMLElementWithProps) {
  props.value = {
    content: null
  };
  isShown.value = false;
  el.removeEventListener('mouseover', () => {
    onMouseOver(el, isShown, props);
  });
  el.removeEventListener('mouseleave', () => {
    onMouseLeave(el, isShown, props);
  });
}
