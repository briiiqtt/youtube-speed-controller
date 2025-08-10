import { keyHandler } from './KeyHandler';

document.addEventListener('keydown', (e) => keyHandler.handleKeyDown(e));
document.addEventListener('keyup', (e) => keyHandler.handleKeyUp(e));