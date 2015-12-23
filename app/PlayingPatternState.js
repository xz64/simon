import OffState from './OffState';
import GameState from './GameState';

export default class extends GameState {
  constructor(gameStateManager, colorButtons, pattern) {
    super(gameStateManager);
    this.pattern = pattern;
    this.colorButtons = colorButtons;
    this.timeElapsed = null;
    this.onTime = 500; // TODO: parameterize onTime/offTime config
    this.offTime = 200;
    this.state = 'off';
    this.currentButton;
  }

  entering() {
    this.timeElapsed = 0;
  }

  leaving() {
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
      this.colorButtons[this.currentButton-1].turnOn();
      this.timeElapsed = 0;
      this.state = 'on';
    }
    else if(this.state === 'on') {
      if(this.timeElapsed > this.onTime) {
        this.colorButtons[this.currentButton-1].turnOff();
        this.timeElapsed = 0;
        this.state = 'off';
        if(this.pattern.length === 0) {
          this.gameStateManager.changeState(
            new OffState(this.gameStateManager));
        }
      }
    }
  }

  render() {
  }
}
