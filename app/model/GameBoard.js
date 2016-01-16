import OffState from './OffState';
import GameStateManager from './GameStateManager';
import PlayingPatternState from './PlayingPatternState';
import InputState from './InputState';
import Sequence from './Sequence';
import QuadrantButton from './QuadrantButton';
import NotifySuccessState from './NotifySuccessState';

export default class {
  constructor() {
    this.WIN_SCORE = 20;
    this.strict = false;
    this.sequence = new Sequence();
    this.emitter = new EventEmitter();
    this.score = 0;
    this.inputBuffer = [];
    this.quadrantButtons = [];

    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(i+1));
    }
  }

  reset() {
    this.sequence = new Sequence();
    this.score = 0;
    this.inputBuffer = [];
  }
  
  toggleStrict(value) {
    this.strict = value ? value : !this.strict;
  }

  pushInput(quadrant) {
    this.inputBuffer.push(quadrant);
  }

  advanceLevel() {
    this.score++;
    this.sequence.addItem.call(this.sequence);
  }
}
