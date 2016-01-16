import OffState from './OffState';
import GameState from './GameState';

export default class extends GameState {
  constructor(gameBoard, doneCallback) {
    super();
    this.gameBoard = gameBoard;
    this.pattern = this.gameBoard.sequence.sequence.slice();
    this.quadrantButtons = this.gameBoard.quadrantButtons;
    this.timeElapsed = null;
    this.onTime = 500; // TODO: parameterize onTime/offTime config
    this.offTime = 200;
    this.state = 'off';
    this.currentButton;
    this.doneCallback = doneCallback;
  }

  entering() {
    this.timeElapsed = 0;
    for(let i = 0; i < this.quadrantButtons.length; i++) {
      this.quadrantButtons[i].lock.call(this.quadrantButtons[i]);
    }
  }

  leaving() {
    for(let i = 0; i < this.quadrantButtons.length; i++) {
      this.quadrantButtons[i].unlock.call(this.quadrantButtons[i]);
    }
  }

  turnOn(index) {
    this.quadrantButtons[index].turnOn.call(this.quadrantButtons[index]);
  }

  turnOff(index) {
    this.quadrantButtons[index].turnOff.call(this.quadrantButtons[index]);
  }

  update(step) {
    this.timeElapsed += 1000/30; // TODO: remove magic number

    if(this.state === 'off') {
      if(this.timeElapsed >= this.offTime) {
        this.timeElapsed = 0;
        this.state = 'turnOn';
      }
    }
    else if(this.state === 'turnOn') {
      this.currentButton = this.pattern.shift();
      this.turnOn(this.currentButton-1);
      this.timeElapsed = 0;
      this.state = 'on';
    }
    else if(this.state === 'on') {
      if(this.timeElapsed > this.onTime) {
        this.turnOff(this.currentButton-1);
        this.timeElapsed = 0;
        this.state = 'off';
        if(this.pattern.length === 0) {
          this.doneCallback();
        }
      }
    }
  }

  render() {
  }
}
