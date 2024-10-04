export type DesignOptions = 'default' | 'minimal';
export type StickOnOptions = 'mousePosition' | 'currentElement';
export type AlignOptions = 'start' | 'end';

export interface ContextMenuOptionsBase {
  design: DesignOptions;
  stickOn: StickOnOptions;
}

export interface ContextMenuOptionsCurrentPosition
  extends ContextMenuOptionsBase {
  stickOn: 'currentElement';
  align?: AlignOptions;
  padX?: number;
  padY?: number;
  inset?: number;
}

export interface ContextMenuOptionsMousePosition
  extends ContextMenuOptionsBase {
  stickOn: 'mousePosition';
}

export type ContextMenuOptions =
  | ContextMenuOptionsCurrentPosition
  | ContextMenuOptionsMousePosition;
