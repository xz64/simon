import GameState from './GameState';

export default class {
  constructor() {
    this.currentState = new GameState(this);
  }

  changeState(newState) {
    this.currentState.leaving.call(this.currentState);
    this.currentState = newState;
    this.currentState.entering.call(this.currentState);
  }
 
  update(step) {
    this.currentState.update.call(this.currentState, step);
  }

  render() {
    this.currentState.render.call(this.currentState);
  }
}
