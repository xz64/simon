import GameEngine from './GameEngine';
import PIXIRenderer from '../view/PIXIRenderer';
import GameBoard from '../model/GameBoard';
import GameLogicService from '../model/GameLogicService.js';
import GameBoardView from '../view/GameBoard';
import QuadrantButtonView from '../view/QuadrantButton';
import QuadrantButtonController from './QuadrantButtonController';
import NotificationController from './NotificationController';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameBoard = new GameBoard();
    this.gameBoardView = new GameBoardView(this.width, this.height);
    this.gameLogicService = new GameLogicService(this.gameBoard);
    this.gameBoardView.emitter.on('on', this.turnOn, this);
    this.gameBoardView.emitter.on('off', this.turnOff, this);
    this.updateCallback = this.update.bind(this);
    this.renderCallback = this.render.bind(this);

    this.quadrantButtonControllers = [];
    this.notificationController = new NotificationController(
      this.gameLogicService.emitter, this.gameBoardView.notifications);

    for(let i = 0; i < 4; i++) {
      this.quadrantButtonControllers.push(new QuadrantButtonController(
        this.gameBoard.quadrantButtons[i],
        this.gameBoardView.quadrantButtons[i]));
      this.quadrantButtonControllers[i].emitter.on('input', this.onInput, this);
    }

    this.gameEngine = new GameEngine(this.updateCallback, this.renderCallback);
    this.gameEngine.startGame();
  }

  addRenderable(item) {
    this.gameRenderer.addItem.call(this.gameRenderer, item);
  }

  showSuccess() {
  }

  hideSuccess() {
  }

  turnOff() {
    this.gameLogicService.turnOff();
  }

  turnOn() {
    this.gameLogicService.begin();
  }

  render() {
    this.gameBoardView.render.call(this.gameBoardView);
  }

  update() {
    this.gameLogicService.update.call(this.gameLogicService);
  }

  onInput(quadrant) {
    this.gameBoard.pushInput.call(this.gameBoard, quadrant);
  }
}
