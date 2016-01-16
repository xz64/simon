import GameState from './GameState';

export default class extends GameState {
  constructor(gameBoard, doneCallback) {
    super();
    this.timeElapsed = null;
    this.onTime = 1000; // TODO: parameterize onTime/offTime config
    this.doneCallback = doneCallback;
    this.gameBoard = gameBoard;
  }

  entering() {
    this.timeElapsed = 0;
    this.gameBoard.emitter.emit('NotifySuccessOn');
  }

  leaving() {
  }

  update(step) {
    this.timeElapsed += 1000/30; // TODO: remove magic number

    if(this.timeElapsed > this.onTime) {
      this.gameBoard.emitter.emit('NotifySuccessOff');
      this.doneCallback();
    }
  }

  render() {
  }
}
