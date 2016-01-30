export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.marginLeft = (this.width - this.boardSize) / 2 ;
    this.marginTop = (this.height - this.boardSize) / 2 ;
  }
}
