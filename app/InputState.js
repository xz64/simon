import GameState from './GameState';

export default class extends GameState {
  constructor(gameStateManager, colorButtons, expectedSequence, successCallback,
    errorCallback) {
    super(gameStateManager);
    this.inputBuffer = [];
    this.expectedSequence = expectedSequence;
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

  isMatchSoFar() {
    return this.expectedSequence.equalSoFar.call(this.expectedSequence,
      this.inputBuffer);
  }

  isMatch() {
    return this.expectedSequence.equal.call(this.expectedSequence,
      this.inputBuffer);
  }

  render() {
  }

}
