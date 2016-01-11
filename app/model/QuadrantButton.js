export default class {
  constructor(quadrant) {
    this.quadrant = quadrant;
    this.state = 'off';
    this.locked = true;
    this.emitter = new EventEmitter();
  }

  setState(state) {
    if(this.locked === false) {
      this.state = state;
    }
  }

  turnOn() {
    this.state = 'on';
    this.emitter.emit('turnOn');
  }

  turnOff() {
    this.state = 'off';
    this.emitter.emit('turnOff');
  }

  lock() {
    this.locked = true;
    this.emitter.emit('lock');
  }

  unlock() {
    this.locked = false;
    this.emitter.emit('unlock');
  }
}
