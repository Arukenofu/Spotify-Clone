import type { Directive } from 'vue';
import type { BindingValues } from '@/app/directives/Tooltip/types/BindingTypes';

declare module '@vue/runtime-core' {
  interface GlobalDirectives {
    vTooltip: Directive<HTMLElement, BindingValues>;
  }
  interface ComponentCustomProperties {
    vTooltip: Directive<HTMLElement, BindingValues>;
  }
}

export {};
