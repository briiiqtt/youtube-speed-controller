import type { Feature } from './Feature';
export type HotKeyMap = Record<Feature, string>;
export const DEFAULT_KEYS: HotKeyMap = {
  PRESS_x1: 'x',
  PRESS_x2: 'v',
  PRESS_x3: 'b',
  PRESS_x4: 'n',
  HOLD_x1: 'z',
  HOLD_x2: 'a',
  HOLD_x3: 's',
  HOLD_x4: 'd',
};
