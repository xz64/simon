import OffState from './OffState';
import PlayingPatternState from './PlayingPatternState';
import GameState from './GameState';

export default class extends GameState {
  constructor(gameStateManager, colorButtons, expectedBuffer) {
    super(gameStateManager);
    this.inputBuffer = [];
    this.expectedBuffer = expectedBuffer;
    this.colorButtons = colorButtons;
  }

  entering() {
    for(let i = 0; i < this.colorButtons.length; i++) {
      this.colorButtons[i].addObserver.call(
        this.colorButtons[i], this);
      this.colorButtons[i].enableInput.call(this.colorButtons[i]);
    }
  }

  leaving() {
    for(let i = 0; i < this.colorButtons.length; i++) {
      this.colorButtons[i].removeObserver.call(
        this.colorButtons[i], this);
      this.colorButtons[i].disableInput.call(this.colorButtons[i]);
    }
  }

  onNotify(evt) {
    this.inputBuffer.push(evt.quadrant);
  }

  update(step) {
    if(this.inputBuffer.length > 0) {
      if(this.isMatch()) {
        //this.changeState(new OffState(this.gameStateManager));
        this.changeState(new PlayingPatternState(this.gameStateManager,
          this.colorButtons, [1,2]));
      }
      if(this.inputBuffer.length > this.expectedBuffer.length) {
          //TODO: Switch to replay state
      }
    }
  }

  render() {
  }

  isMatch() {
    if(this.inputBuffer.length !== this.expectedBuffer.length) {
      return false;
    }

    for(let i = 0; i < this.inputBuffer.length; i++) {
      if(this.inputBuffer[i] !== this.expectedBuffer[i]) {
        return false;
      }
    }

    return true;
  }
}
