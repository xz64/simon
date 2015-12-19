import Observable from './Observable';

export default class extends Observable {
  constructor(gameStateManager) {
    super();
    this.gameStateManager = gameStateManager;
  }

  changeState() {
    this.gameStateManager.changeState.bind(this.gameStateManager)(...arguments);
  }

  entering() {
  }

  leaving() {
  }
 
  update(step) {
  }

  render() {
  }
}
