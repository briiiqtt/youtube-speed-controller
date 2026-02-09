import { speedController } from '../content/SpeedController';
import type { Feature } from './Feature';
import { DEFAULT_KEYS, type HotKeyMap } from './HotKeyMap';

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName != 'local') return;
  hotKey.loadKeyMap();
});

class HotKey {
  pressedKeys: Set<string>;
  keyMap: HotKeyMap;

  constructor() {
    this.pressedKeys = new Set();
    this.keyMap = DEFAULT_KEYS;
    (async () => {
      this.keyMap = await this.loadKeysFromStorage();
    })();
  }

  public onKeyDown(e: KeyboardEvent): void {
    // e.preventDefault(); //? 해야하나 말아야하나

    const key = e.key.toLowerCase();
    this.pressedKeys.add(key);

    const hotKeyString = Array.from(this.pressedKeys).join(' + ');

    const feature = Object.keys(this.keyMap).find(
      (k) => this.keyMap[k as Feature] === hotKeyString
    ) as Feature | undefined;

    if (feature) this.featureActions[feature](true);
  }

  public onKeyUp(e: KeyboardEvent): void {
    const key = e.key.toLowerCase();
    const hotKeyString = Array.from(this.pressedKeys).join(' + ');

    const feature = Object.keys(this.keyMap).find(
      (k) => this.keyMap[k as Feature] === hotKeyString
    ) as Feature | undefined;

    this.pressedKeys.delete(key);

    if (feature) this.featureActions[feature](false);
  }

  public onBlur() {
    this.pressedKeys.clear();
  }

  async loadKeyMap(): Promise<void> {
    this.keyMap = await this.loadKeysFromStorage();
  }

  private loadKeysFromStorage(): Promise<HotKeyMap> {
    return new Promise((resolve) => {
      chrome.storage.local.get('hotKeys', (result) => {
        if (result.hotKeys) {
          console.log('loadKeysFromStorage', result);

          resolve(result.hotKeys);
        } else resolve(DEFAULT_KEYS);
      });
    });
  }

  private featureActions: Record<Feature, (isKeyDown: boolean) => void> = {
    PRESS_x0_5: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(0.5);
    },
    PRESS_x0_75: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(0.75);
    },
    PRESS_x1: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(1);
    },
    PRESS_x1_5: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.setSpeed(1.5);
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
    HOLD_x0_5: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(0.5);
      else speedController.unholdSpeed();
    },
    HOLD_x0_75: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(0.75);
      else speedController.unholdSpeed();
    },
    HOLD_x1: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(1);
      else speedController.unholdSpeed();
    },
    HOLD_x1_5: (isKeyDown: boolean) => {
      if (isKeyDown) speedController.holdSpeed(1.5);
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

export const hotKey = new HotKey();
