import GameState from './GameState';

export default class extends GameState {
  constructor(gameBoard) {
    super();
    this.gameBoard = gameBoard;
    this.quadrantButtons = this.gameBoard.quadrantButtons;
  }

  entering() {
    for(let i = 0; i < this.quadrantButtons.length; i++) {
      this.quadrantButtons[i].turnOff.call(this.quadrantButtons[i]);
      this.quadrantButtons[i].lock.call(this.quadrantButtons[i]);
    }
  }
}
