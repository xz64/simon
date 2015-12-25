import GameState from './GameState';

export default class extends GameState {
  constructor(gameStateManager, colorButtons, expectedBuffer, successCallback,
    errorCallback) {
    super(gameStateManager);
    this.inputBuffer = [];
    this.expectedBuffer = expectedBuffer;
    this.colorButtons = colorButtons;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
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
    if(!this.isMatchSoFar()) {
      this.changeState(this.errorCallback());
    }
    if(this.isMatch()) {
      this.changeState(this.successCallback());
    }
  }

  render() {
  }

  isMatchSoFar() {
    if(this.inputBuffer.length > this.expectedBuffer.length) {
      return false;
    }

    for(let i = 0; i < this.inputBuffer.length; i++) {
      if(this.inputBuffer[i] !== this.expectedBuffer[i]) {
        return false;
      }
    }

    return true;
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
