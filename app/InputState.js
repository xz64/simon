import OffState from './OffState';
import GameState from './GameState';

export default class extends GameState {
  constructor(gameStateManager, colorButtons) {
    super(gameStateManager);
    this.inputBuffer = [];
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
      this.changeState(new OffState(this.gameStateManager));
    }
  }

  render() {
  }
}
