export interface ComposableOptions {
  align?: 'start' | 'end';
  padX?: number,
  padY?: number,
  inset?: number,
  stickOn?: 'currentElement' | 'mousePosition';
  design?: 'default' | 'minimal'
}

export interface FuncOptions extends Omit<ComposableOptions, 'stickOn'> {
  contextMenuWidth: number;
  contextMenuHeight: number;
}