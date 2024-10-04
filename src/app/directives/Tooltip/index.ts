import { bind, destroyTooltip } from '@/app/directives/Tooltip/core';
import type { HTMLElementWithProps } from '@/app/directives/Tooltip/types/HTMLElementWithProps';
import type { Directive } from 'vue';

export const Tooltip = {
  beforeMount: bind,
  mounted: bind,
  beforeUnmount(el: HTMLElementWithProps) {
    destroyTooltip(el);
  }
} satisfies Directive;
