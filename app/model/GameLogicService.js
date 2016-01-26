/*global EventEmitter*/

import OffState from './OffState';
import GameStateManager from './GameStateManager';
import PlayingPatternState from './PlayingPatternState';
import InputState from './InputState';
import NotificationState from './NotificationState';

export default class {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.gameStateManager = new GameStateManager();
    this.emitter = new EventEmitter();
  }

  update(step, residual) {
    this.gameStateManager.update.call(this.gameStateManager, step, residual);
  }

  begin() {
    this.reset();
    this.playCurrentPattern();
  }

  reset() {
    this.gameBoard.reset.call(this.gameBoard);
  }

  turnOff() {
    this.changeState(new OffState(this.gameBoard));
  }

  onMatch() {
    this.notifySuccess(this.advanceLevel.bind(this));
  }

  notifySuccess(callback) {
    this.changeState(new NotificationState(this, 'success', callback, 1000));
  }

  notifyFailure(callback) {
    this.changeState(new NotificationState(this, 'failure', callback, 1000));
  }

  notifyWin(callback) {
    this.changeState(new NotificationState(this, 'win', callback, 5000));
  }

  waitForInput() {
    this.changeState(new InputState(this.gameBoard, this));
  }

  playCurrentPattern() {
    this.changeState(new PlayingPatternState(this.gameBoard,
      this.waitForInput.bind(this)));
  }

  onMismatch() {
    this.notifyFailure(() => {
      if(this.gameBoard.strict) {
        this.reset();
      }
      this.playCurrentPattern();
    });
  }

  startOver() {
    this.reset();
    this.playCurrentPattern();
  }
  
  advanceLevel() {
    this.gameBoard.advanceLevel.call(this.gameBoard);
    if(this.gameBoard.score === this.gameBoard.WIN_SCORE) {
      this.gameBoard.setScore.call(this.gameBoard, -1);
      this.notifyWin(this.startOver.bind(this));
    }
    else {
      this.playCurrentPattern();
    }
  }

  changeState(newState) {
    this.gameStateManager.changeState.call(this.gameStateManager, newState);
  }
}
