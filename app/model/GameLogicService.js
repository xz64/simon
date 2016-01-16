import OffState from './OffState';
import GameStateManager from './GameStateManager';
import PlayingPatternState from './PlayingPatternState';
import InputState from './InputState';
import Sequence from './Sequence';
import QuadrantButton from './QuadrantButton';
import NotifySuccessState from './NotifySuccessState';

export default class {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.gameStateManager = new GameStateManager();
    this.emitter = new EventEmitter();
  }

  update() {
    this.gameStateManager.update.call(this.gameStateManager);
  }

  begin() {
    this.playCurrentPattern();
  }

  reset() {
    this.gameBoard.reset.call(this.gameBoard);
    this.playCurrentPattern();
  }

  onMatch() {
    this.notifySuccess(this.advanceLevel.bind(this));
  }

  notifySuccess(callback) {
    this.changeState(new NotifySuccessState(this.gameBoard, callback));
  }

  waitForInput() {
    this.changeState(new InputState(this.gameBoard, this));
  }

  playCurrentPattern() {
    this.changeState(new PlayingPatternState(this.gameBoard,
      this.waitForInput.bind(this)));
  }

  onMismatch() {
    if(this.gameBoard.strict) {
      this.reset();
    }
    else {
      this.playCurrentPattern();
    }
  }
  
  advanceLevel() {
    this.gameBoard.advanceLevel.call(this.gameBoard);
    if(this.gameBoard.score === this.gameBoard.WIN_SCORE) {
      this.reset();
    }
    this.playCurrentPattern();
  }

  changeState(newState) {
    this.gameStateManager.changeState.call(this.gameStateManager, newState);
  }
}
