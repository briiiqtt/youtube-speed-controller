class Video {
  get element(): HTMLVideoElement | null {
    const videos = document.querySelectorAll('video');
    if (videos.length === 0) {
      return null;
    }

    let largestVideo = null;
    let maxArea = 0;

    videos.forEach((video) => {
      const area = video.offsetWidth * video.offsetHeight;
      if (area > maxArea) {
        maxArea = area;
        largestVideo = video;
      }
    });

    return largestVideo;
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
