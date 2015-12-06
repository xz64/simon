import Button from './Button';

export default class extends Button {
  constructor(width, height, quadrant) {
    super(width, height);
    this.smallRadius = this.boardSize / 5;
    this.bigRadius = this.boardSize / 2.5;
  }

  createGraphics() {}
  createSprite() {}
  createInteractivity() {}
}
