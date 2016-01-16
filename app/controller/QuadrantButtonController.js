export default class {
  constructor(quadrantButton, quadrantButtonView) {
    this.quadrantButton = quadrantButton;
    this.quadrantButtonView = quadrantButtonView;
    this.emitter = new EventEmitter();
    this.quadrantButton.emitter.on('turnOn', this.quadrantButtonView.turnOn,
      this.quadrantButtonView);
    this.quadrantButton.emitter.on('turnOff', this.quadrantButtonView.turnOff,
      this.quadrantButtonView);
    this.quadrantButton.emitter.on('lock', this.quadrantButtonView.disableInput,
      this.quadrantButtonView);
    this.quadrantButton.emitter.on('unlock', 
      this.quadrantButtonView.enableInput, this.quadrantButtonView);
    this.quadrantButtonView.emitter.on('pressed', this.onInput, this);
  }

  onInput() {
    this.emitter.emit('input', this.quadrantButtonView.quadrant);
  }
}
