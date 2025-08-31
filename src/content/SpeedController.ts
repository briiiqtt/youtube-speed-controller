import { video } from './Video';

class SpeedController {
  private savedSpeed = 1;
  private wasPaused = false;

  holdSpeed(speed: number) {
    video.setSpeed(speed);

    if (video.paused) {
      video.play();
      this.wasPaused = true;
    }
  }

  unholdSpeed() {
    video.setSpeed(this.savedSpeed);

    if (this.wasPaused) {
      video.pause();
      this.wasPaused = false;
    }
  }

  setSpeed(speed: number) {
    this.savedSpeed = speed;
    video.setSpeed(speed);
  }
}

export const speedController = new SpeedController();
