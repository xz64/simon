export default class {
  constructor(quadrantButton, quadrantButtonView) {
    this.quadrantButton = quadrantButton;
    this.quadrantButtonView = quadrantButtonView;
    this.emitter = new EventEmitter();
    this.quadrantButton.emitter.on('turnOn', this.turnOn, this);
    this.quadrantButton.emitter.on('turnOff', this.turnOff, this);
    this.quadrantButtonView.emitter.on('onInput', this.onInput, this);
  }

  turnOn() {
    this.quadrantButtonView.turnOn.call(this.quadrantButtonView);
  }

  turnOff() {
    this.quadrantButtonView.turnOff.call(this.quadrantButtonView);
  }

  onInput() {
    this.emitter.emit('input', this.quadrantButtonView.quadrant);
  }
}
