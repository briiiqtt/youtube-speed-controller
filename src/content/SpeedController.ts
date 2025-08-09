import { video } from './Video';
import { indicator } from './Indicator';

class SpeedController {
  private prevSpeed = 1;
  private wasPaused = false;

  holdSpeed(speed: number) {
    this.prevSpeed = video.setSpeed(speed);

    if (video.paused) {
      video.play();
      this.wasPaused = true;
    }

    indicator.setSpeed(speed);
  }

  unholdSpeed() {
    video.setSpeed(this.prevSpeed);

    if (this.wasPaused) {
      video.pause();
      this.wasPaused = false;
    }

    indicator.setSpeed(this.prevSpeed);
  }

  setSpeed(speed: number) {
    video.setSpeed(speed);
    indicator.setSpeed(speed);
  }
}

export const speedController = new SpeedController();
