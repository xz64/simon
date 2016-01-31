/*global PIXI*/

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.marginLeft = (this.width - this.boardSize) / 2 ;
    this.marginTop = (this.height - this.boardSize) / 2 ;
    this.graphicsContainer = new PIXI.Graphics();
  }

  getRenderables() {
    return this.graphicsContainer;
  }
}
