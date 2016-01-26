import GameState from './GameState';

export default class extends GameState {
  constructor(gameLogicService, message, doneCallback, duration) {
    super();
    this.timeElapsed = null;
    this.duration = duration;
    this.doneCallback = doneCallback;
    this.emitter = gameLogicService.emitter;
    this.message = message;
  }

  entering() {
    this.timeElapsed = 0;
    this.emitter.emit('notification_on', this.message);
  }

  leaving() {
  }

  update(step, residual) {
    this.timeElapsed += step + residual;

    if(this.timeElapsed > this.duration) {
      this.emitter.emit('notification_off', this.message);
      this.doneCallback();
    }
  }

  render() {
  }
}
