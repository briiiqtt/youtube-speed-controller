export type Feature =
  | 'HOLD_x0_5'
  | 'HOLD_x0_75'
  | 'HOLD_x1'
  | 'HOLD_x1_5'
  | 'HOLD_x2'
  | 'HOLD_x3'
  | 'HOLD_x4'
  | 'PRESS_x0_5'
  | 'PRESS_x0_75'
  | 'PRESS_x1'
  | 'PRESS_x1_5'
  | 'PRESS_x2'
  | 'PRESS_x3'
  | 'PRESS_x4';

export function isFeature(value: string): value is Feature {
  return [
    'HOLD_x0_5',
    'HOLD_x0_75',
    'HOLD_x1',
    'HOLD_x1_5',
    'HOLD_x2',
    'HOLD_x3',
    'HOLD_x4',
    'PRESS_x0_5',
    'PRESS_x0_5',
    'PRESS_x1',
    'PRESS_x1_5',
    'PRESS_x2',
    'PRESS_x3',
    'PRESS_x4',
  ].includes(value as Feature);
}
