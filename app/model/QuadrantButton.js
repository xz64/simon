export default class {
  constructor(quadrant) {
    this.quadrant = quadrant;
    this.state = 'off';
    this.emitter = new EventEmitter();
  }

  setState(state) {
    this.state = state;
  }

  turnOn() {
    this.state = 'on';
    this.emitter.emit('turnOn');
  }

  turnOff() {
    this.state = 'off';
    this.emitter.emit('turnOff');
  }
}
