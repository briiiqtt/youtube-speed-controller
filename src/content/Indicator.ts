class Indicator {
  get element(): HTMLVideoElement | null {
    return document.querySelector('.ytp-speedmaster-overlay');
  }

  get innerElement(): HTMLElement | null {
    return document.querySelector('.ytp-speedmaster-label');
  }

  setSpeed(speed: number) {
    if (!this.element || !this.innerElement) return;
    if (speed == 1) {
      this.element.style.display = 'none';
      this.innerElement.innerHTML = '2배';
    } else {
      this.element.style.display = '';
      this.innerElement.innerHTML = speed + '배';
    }
  }
}

export const indicator = new Indicator();
