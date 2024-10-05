import type { HorizontalAxis, VerticalAxis } from '../types/Axes';
import type { Bindings } from '@/app/directives/Tooltip/types/BindingTypes';

export default function (
  value: Bindings['arg']
): [HorizontalAxis, VerticalAxis] {
  return value?.split('_') as [HorizontalAxis, VerticalAxis];
}
