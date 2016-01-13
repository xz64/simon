import OffState from './OffState';
import GameStateManager from './GameStateManager';
import PlayingPatternState from './PlayingPatternState';
import InputState from './InputState';
import Sequence from './Sequence';
import QuadrantButton from './QuadrantButton';

export default class {
  constructor() {
    this.WIN_SCORE = 20;
    this.strict = false;
    this.sequence = new Sequence();
    this.gameStateManager = new GameStateManager();
    this.score = 0;
    this.inputBuffer = [];
    this.quadrantButtons = [];

    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(i+1));
    }
  }

  update() {
    this.gameStateManager.update.call(this.gameStateManager);
  }

  reset() {
    this.sequence = new Sequence();
    this.score = 0;
    this.inputBuffer = [];
    this.changeState(new OffState(this));
  }
  
  begin() {
    this.playCurrentPattern();
  }

  toggleStrict(value) {
    this.strict = value ? value : !this.strict;
  }

  pushInput(quadrant) {
    this.inputBuffer.push(quadrant);
  }

  isMatch() {
    return this.sequence.equal.call(this.sequence, this.inputBuffer);
  }

  isMatchSoFar(input) {
    return this.sequence.equalSoFar.call(this.sequence, this.inputBuffer);
  }

  onMatch() {
    this.advanceLevel();
  }

  playCurrentPattern() {
    this.changeState(new PlayingPatternState(this.quadrantButtons,
      this.sequence, this.reset.bind(this)));
  }

  onMismatch() {
    if(this.strict) {
      this.reset();
    }
    else {
      this.playCurrentPattern();
    }
  }
  
  advanceLevel() {
    this.score++;
    if(this.score === this.WIN_SCORE) {
      // notify user of victory
    }
    else {
      this.sequence.addItem.call(this.sequence);
      this.playCurrentPattern();
    }
  }

  changeState(newState) {
    this.gameStateManager.changeState.call(this.gameStateManager, newState);
  }
}
