import type {
  Axes,
  HorizontalAxis,
  VerticalAxis
} from '@/app/directives/Tooltip/types/Axes';
import type { DirectiveBinding, StyleValue } from 'vue';

export interface BindingObject {
  content: string | null;
  showDelay?: number;
  unShowDelay?: number;
  distance?: number;
  allowInnerHTML?: boolean;
  placement?: [HorizontalAxis, VerticalAxis] | [HorizontalAxis] | [];
  style?: StyleValue;
}

export type BindingValues = BindingObject | string;

export type Bindings = DirectiveBinding<BindingValues, '', Axes>;
