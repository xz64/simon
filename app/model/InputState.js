import OffState from './OffState';
import GameState from './GameState';

export default class extends GameState {
  constructor(gameBoard) {
    super();
    this.gameBoard = gameBoard;
  }

  entering() {
    for(let i = 0; i < this.gameBoard.quadrantButtons.length; i++) {
      this.gameBoard.quadrantButtons[i].unlock.call(
        this.gameBoard.quadrantButtons[i]);
    }
  }

  leaving() {
    for(let i = 0; i < this.gameBoard.quadrantButtons.length; i++) {
      this.gameBoard.quadrantButtons[i].lock.call(
        this.gameBoard.quadrantButtons[i]);
    }

    this.gameBoard.inputBuffer = [];
  }

  update(step) {
    if(!this.gameBoard.isMatchSoFar.call(this.gameBoard)) {
      this.gameBoard.onMismatch.call(this.gameBoard);
    }
    else if(this.gameBoard.isMatch.call(this.gameBoard)) {
      this.gameBoard.onMatch.call(this.gameBoard);
    }
  }
}
