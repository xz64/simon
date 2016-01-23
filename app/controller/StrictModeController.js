export default class {
  constructor(view, gameBoard) {
    this.view = view;
    this.gameBoard = gameBoard;
    this.view.emitter.on('on', this.enableStrictMode, this);
    this.view.emitter.on('off', this.disableStrictMode, this);
  }

  enableStrictMode() {
    this.gameBoard.toggleStrict.call(this.gameBoard, true);
  }

  disableStrictMode() {
    this.gameBoard.toggleStrict.call(this.gameBoard, false);
  }
}
