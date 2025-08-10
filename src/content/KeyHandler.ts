import { hotKey } from '../common/HotKey';

class KeyHandler {
  handleKeyDown(e: KeyboardEvent) {
    if (e.repeat) return;
    hotKey.onKeyDown(e);
  }

  handleKeyUp(e: KeyboardEvent) {
    hotKey.onKeyUp(e);
  }
}

export const keyHandler = new KeyHandler();
