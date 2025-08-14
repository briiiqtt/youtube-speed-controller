import { keyHandler } from './KeyHandler';

document.addEventListener('keydown', (e) => keyHandler.handleKeyDown(e));
document.addEventListener('keyup', (e) => keyHandler.handleKeyUp(e));
window.addEventListener('blur', () => keyHandler.handleBlur());
document.addEventListener('visibilitychange', () => {
  if (document.hidden) keyHandler.handleBlur();
});
