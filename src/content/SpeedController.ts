import { video } from './Video';
import { indicator } from './Indicator';

class SpeedController {
  private prevSpeed = 1;
  private wasPaused = false;

  holdSpeed(speed: number) {
    this.setSpeed(speed);

    if (video.paused) {
      video.play();
      this.wasPaused = true;
    }
  }

  unholdSpeed() {
    this.setSpeed(this.prevSpeed);

    if (this.wasPaused) {
      video.pause();
      this.wasPaused = false;
    }
  }

  setSpeed(speed: number) {
    console.log('setspeed', speed);

    video.setSpeed(speed);
    indicator.setSpeed(speed);
  }
}

export const speedController = new SpeedController();
