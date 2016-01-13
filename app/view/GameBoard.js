import PIXIRenderer from './PIXIRenderer';
import QuadrantButton from './QuadrantButton';
import OnOffSwitch from './OnOffSwitch';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameRenderer = new PIXIRenderer(this.width, this.height);
    this.quadrantButtons = [];
    this.onOffSwitch = new OnOffSwitch(this.width, this.height);
    this.onOffSwitch.emitter.on('on', this.turnOn, this);
    this.onOffSwitch.emitter.on('off', this.turnOff, this);
    this.addRenderable(this.onOffSwitch.getRenderables());
    this.emitter = new EventEmitter();
    // TODO: put all renderables in an array and call addRenderable that way

    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(this.width, this.height,
        i+1));
      this.addRenderable(this.quadrantButtons[i].getRenderables.call(
        this.quadrantButtons[i]));
    }
  }

  turnOn() {
    this.emitter.emit('on');
  }

  turnOff() {
    this.emitter.emit('off');
  }

  addRenderable(item) {
    this.gameRenderer.addItem.call(this.gameRenderer, item);
  }

  render() {
    this.gameRenderer.render.call(this.gameRenderer);
  }
}
