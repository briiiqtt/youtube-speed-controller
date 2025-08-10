import { isFeature, type Feature } from '../common/Feature';

type HotKeyMap = Record<Feature, string>;
const DEFAULT_KEYS: HotKeyMap = {
  PRESS_x1: 'x',
  PRESS_x2: 'v',
  PRESS_x3: 'b',
  PRESS_x4: 'n',
  HOLD_x1: 'z',
  HOLD_x2: 'a',
  HOLD_x3: 's',
  HOLD_x4: 'd',
};

console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const element = e.target as HTMLInputElement;
  if (!element.classList.contains('keyInput')) return;
  // e.preventDefault(); //?

  const hotKeyString = recordKeyDown(e);

  element.value = hotKeyString;
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  const element = e.target as HTMLInputElement;
  if (!element.classList.contains('keyInput')) return;

  if (isFeature(element.id)) {
    const feature = element.id as Feature;
    const hotKeyString = finishRecord(feature);
    element.value = hotKeyString;
  } else {
    alert('error');
  }
});

const pressedKeys = new Set<string>();
let keyMap: HotKeyMap = DEFAULT_KEYS;

function recordKeyDown(e: KeyboardEvent): string {
  const key = e.key.toLowerCase();
  pressedKeys.add(key);

  const hotKeyString = Array.from(pressedKeys).join(' + ');

  console.log('record', hotKeyString);

  return hotKeyString;
}

function finishRecord(feature: Feature): string {
  const hotKeyString = Array.from(pressedKeys).join(' + ');
  pressedKeys.clear();
  keyMap[feature] = hotKeyString;

  console.log('record fin', hotKeyString);

  saveKeysToStorage(keyMap);

  return hotKeyString;
}

function saveKeysToStorage(keyMap: HotKeyMap): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ hotKeys: keyMap }, () => resolve());
  });
}

function loadKeysFromStorage(): Promise<HotKeyMap> {
  return new Promise((resolve) => {
    chrome.storage.sync.get('hotKeys', (result) => {
      if (result.hotKeys) resolve(result.hotKeys);
      else resolve(DEFAULT_KEYS);
    });
  });
}

document.addEventListener('load', async () => {
  keyMap = await loadKeysFromStorage();
});
