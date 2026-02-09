import type { Feature } from './Feature';
export type HotKeyMap = Record<Feature, string>;
export const DEFAULT_KEYS: HotKeyMap = {
  PRESS_x0_5: '',
  PRESS_x0_75: '',
  PRESS_x1: 'q',
  PRESS_x1_5: '',
  PRESS_x2: 'w',
  PRESS_x3: 'e',
  PRESS_x4: 'r',
  HOLD_x0_5: 'z',
  HOLD_x0_75: 'x',
  HOLD_x1: 'a',
  HOLD_x1_5: 'v',
  HOLD_x2: 's',
  HOLD_x3: '',
  HOLD_x4: 'd',
};
