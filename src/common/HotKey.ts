import { speedController } from '../content/SpeedController';
import type { Feature } from './Feature';
import { DEFAULT_KEYS, type HotKeyMap } from './HotKeyMap';

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

  onKeyDown(e: KeyboardEvent): Feature | null {
    // e.preventDefault(); //? 해야하나 말아야하나

    const key = e.key.toLowerCase();
    this.pressedKeys.add(key);

    const hotKeyString = Array.from(this.pressedKeys).join(' + ');

    const feature = Object.keys(this.keyMap).find(
      (k) => this.keyMap[k as Feature] === hotKeyString
    ) as Feature | undefined;

    console.log('onKeyDown', hotKeyString, feature);

    if (feature) this.featureActions[feature](true);
    return feature || null;
  }

  onKeyUp(e: KeyboardEvent): Feature | null {
    const key = e.key.toLowerCase();
    const hotKeyString = Array.from(this.pressedKeys).join(' + ');

    const feature = Object.keys(this.keyMap).find(
      (k) => this.keyMap[k as Feature] === hotKeyString
    ) as Feature | undefined;

    console.log('onKeyUp', hotKeyString, feature);

    this.pressedKeys.delete(key);

    if (feature) this.featureActions[feature](false);
    return feature || null;
  }

  recordKeyDown(e: KeyboardEvent): string {
    const key = e.key.toLowerCase();
    this.pressedKeys.add(key);

    const hotKeyString = Array.from(this.pressedKeys).join(' +  ');

    console.log('record', hotKeyString);
    
    return hotKeyString;
  }

  finishRecord(feature: Feature): string {
    const hotKeyString = Array.from(this.pressedKeys).join(' + ');
    this.pressedKeys.clear();
    this.keyMap[feature] = hotKeyString;

    console.log('record fin', hotKeyString);

    return hotKeyString;
  }

  loadKeysFromStorage(): Promise<HotKeyMap> {
    return new Promise((resolve) => {
      chrome.storage.sync.get('hotKeys', (result) => {
        if (result.hotKeys) resolve(result.hotKeys);
        else resolve(DEFAULT_KEYS);
      });
    });
  }

  saveKeysToStorage(keys: HotKeyMap): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ hotKeys: keys }, () => resolve());
    });
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

export const hotKey = new HotKey();
