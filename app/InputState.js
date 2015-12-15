import GameState from './GameState';

export default class extends GameState {
  constructor(colorButtons) {
    super();
    this.inputBuffer = [];
    this.colorButtons = colorButtons;
    for(let i = 0; i < this.colorButtons.length; i++) {
      this.colorButtons[i].addObserver.call(this.colorButtons[i], this);
    }
  }

  entering() {
    for(let i = 0; i < this.colorButtons.length; i++) {
      this.colorButtons[i].sprite.interactive = true;
    }
  }

  leaving() {
    for(let i = 0; i < this.colorButtons.length; i++) {
      this.colorButtons[i].sprite.interactive = false;
    }
  }

  onNotify(evt) {
    this.inputBuffer.push(evt.quadrant);
  }
}
