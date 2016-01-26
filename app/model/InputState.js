import GameState from './GameState';

export default class extends GameState {
  constructor(gameBoard, gameLogicService) {
    super();
    this.gameBoard = gameBoard;
    this.gameLogicService = gameLogicService;
    this.expectedSequence = this.gameBoard.sequence;
    this.inputBuffer = this.gameBoard.inputBuffer;
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

  update() {
    if(!this.expectedSequence.equalSoFar.call(this.expectedSequence,
      this.inputBuffer)) {
      this.gameLogicService.onMismatch.call(this.gameLogicService);
    }
    else if(this.expectedSequence.equal.call(this.expectedSequence,
      this.inputBuffer)) {
      this.gameLogicService.onMatch.call(this.gameLogicService);
    }
  }
}
