import PIXIRenderer from './PIXIRenderer';
import QuadrantButton from './QuadrantButton';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameRenderer = new PIXIRenderer(this.width, this.height);
    this.quadrantButtons = [];

    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(this.width, this.height,
        i+1));
      this.addRenderable(this.quadrantButtons[i].getRenderables.call(
        this.quadrantButtons[i]));
    }
  }

  addRenderable(item) {
    this.gameRenderer.addItem.call(this.gameRenderer, item);
  }

  render() {
    this.gameRenderer.render.call(this.gameRenderer);
  }
}
