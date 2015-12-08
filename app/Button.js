import Observable from './Observable.js';

export default class extends Observable {
  /* functions that need to be implemented */
  createGraphics() {}
  createSprite() {}
  createInteractivity() {}

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.graphics = this.createGraphics();
    this.sprite = this.createSprite();
    this.registerEventHandlers();
  }
}
