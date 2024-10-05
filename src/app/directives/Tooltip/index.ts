import { bind, destroyTooltip } from '@/app/directives/Tooltip/core';
import type { HTMLElementWithProps } from '@/app/directives/Tooltip/types/HTMLElementWithProps';
import type { Bindings } from '@/app/directives/Tooltip/types/BindingTypes';

export const Tooltip = {
  beforeMount: bind,
  mounted: bind,
  updated(el: HTMLElementWithProps, binding: Bindings) {
    destroyTooltip(el);
    bind(el, binding);
  },
  beforeUnmount(el: HTMLElementWithProps) {
    destroyTooltip(el);
  }
};
