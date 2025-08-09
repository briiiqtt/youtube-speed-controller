class Video {
  get element(): HTMLVideoElement | null {
    return document.querySelector('video');
  }

  get paused(): boolean {
    return this.element?.paused ?? true;
  }

  setSpeed(speed: number): number {
    if (!this.element) return 0;
    const curSpeed: number = this.element.playbackRate;
    this.element.playbackRate = speed;
    return curSpeed;
  }

  pause() {
    this.element?.pause();
  }

  play() {
    this.element?.play();
  }
}

export const video = new Video();
