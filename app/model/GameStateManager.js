import OffState from './OffState';

export default class {
  constructor() {
    this.currentState = new OffState(this);
  }

  changeState(newState) {
    this.currentState.leaving.call(this.currentState);
    this.currentState = newState;
    this.currentState.entering.call(this.currentState);
  }
 
  update(step, residual) {
    this.currentState.update.call(this.currentState, step, residual);
  }
}
