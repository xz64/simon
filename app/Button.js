export default class {
  /* functions that need to be implemented */
  createGraphics() {}
  createSprite() {}
  createInteractivity() {}

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.createGraphics();
    this.createSprite();
    this.createInteractivity();
  }
}
