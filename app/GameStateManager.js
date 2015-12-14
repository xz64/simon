export default class {
  constructor() {
    this.currentState = {
      render: () => {},
      update: () => {}
    };
  }

  changeState(newState) {
    this.currentState.leaving();
    this.currentState = newState;
    this.currentState.entering();
  }
 
  update(step) {
    this.currentState.update(step);
  }

  render() {
    this.currentState.render();
  }
}
