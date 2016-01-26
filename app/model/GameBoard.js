/*global EventEmitter*/

import Sequence from './Sequence';
import QuadrantButton from './QuadrantButton';

export default class {
  constructor() {
    this.WIN_SCORE = 20;
    this.strict = false;
    this.sequence = new Sequence();
    this.emitter = new EventEmitter();
    this.setScore(0);
    this.inputBuffer = [];
    this.quadrantButtons = [];

    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(i+1));
    }
  }

  reset() {
    this.sequence = new Sequence();
    this.setScore(0);
    this.inputBuffer = [];
    this.emitter.emit('reset');
  }
  
  toggleStrict(value) {
    this.strict = (value !== undefined) ? value : !this.strict;
  }

  pushInput(quadrant) {
    this.inputBuffer.push(quadrant);
  }

  setScore(score) {
    this.score = score;
    this.emitter.emit('score', this.score);
  }


  advanceLevel() {
    this.setScore(this.score+1);
    this.sequence.addItem.call(this.sequence);
  }
}
