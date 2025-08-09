import { speedController } from './SpeedController';

class KeyHandler {
  keys: HotKeyMap;
  constructor() {
    this.keys = {
      PRESS_x1: 'x',
      PRESS_x2: 'v',
      PRESS_x3: 'b',
      PRESS_x4: 'n',
      HOLD_x1: 'z',
      HOLD_x2: 'a',
      HOLD_x3: 's',
      HOLD_x4: 'd',
    };
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.repeat) return;

    const feature = Object.keys(this.keys).find(
      (k) => this.keys[k as Feature] === e.key
    ) as Feature | undefined;

    if (feature) this.featureActions[feature](true);
  }

  handleKeyUp(e: KeyboardEvent) {
    const feature = Object.keys(this.keys).find(
      (k) => this.keys[k as Feature] === e.key
    ) as Feature | undefined;

    if (feature) this.featureActions[feature](false);
  }

  private featureActions: Record<Feature, (isKeyDown: boolean) => void> = {
    PRESS_x1: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(1);
    },
    PRESS_x2: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(2);
    },
    PRESS_x3: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(3);
    },
    PRESS_x4: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(4);
    },
    HOLD_x1: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(1);
      else speedController.unholdSpeed();
    },
    HOLD_x2: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(2);
      else speedController.unholdSpeed();
    },
    HOLD_x3: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(3);
      else speedController.unholdSpeed();
    },
    HOLD_x4: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(4);
      else speedController.unholdSpeed();
    },
  };
}

type Feature =
  | 'HOLD_x1'
  | 'HOLD_x2'
  | 'HOLD_x3'
  | 'HOLD_x4'
  | 'PRESS_x1'
  | 'PRESS_x2'
  | 'PRESS_x3'
  | 'PRESS_x4';
type HotKeyMap = Record<Feature, string>;

export const keyHandler = new KeyHandler();
