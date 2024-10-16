import type { ComposableOptions, FuncOptions } from '@/features/CreateContextMenu/types/FuncOptions';

export function getOptions(
  options: FuncOptions | Partial<FuncOptions>,
  defaultOptions: ComposableOptions = {} as ComposableOptions
): ComposableOptions {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const {
    padX = 15,
    padY = 15,
    inset = 24,
    align,
    stickOn = 'currentElement',
  } = mergedOptions;

  return {
    padX,
    padY,
    inset,
    align,
    stickOn
  };
}