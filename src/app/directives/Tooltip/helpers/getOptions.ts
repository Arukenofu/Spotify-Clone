import getModifiers from '../helpers/getModifiers';
import type { Bindings, BindingValues } from '../types/BindingTypes';
import type { TooltipProps } from '@/app/directives/Tooltip/types/TooltipProps';
import type { HTMLElementWithProps } from '@/app/directives/Tooltip/types/HTMLElementWithProps';

export default function (
  el: HTMLElementWithProps,
  value: BindingValues,
  arg: Bindings['arg']
) {
  let options: TooltipProps;

  if (typeof value === 'string') {
    options = {
      content: value
    };
  } else if (typeof value === 'object') {
    options = value;
  } else {
    options = {
      content: null
    };
  }

  options.placement = getModifiers(arg);
  options.parent = el;

  return options;
}
