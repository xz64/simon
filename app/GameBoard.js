import PlayingPatternState from './PlayingPatternState';
import GameEngine from './GameEngine';
import GameStateManager from './GameStateManager';
import GameRenderer from './GameRenderer';
import ColorButton from './ColorButton';
import Audio from './Audio';
import InputState from './InputState';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameStateManager = new GameStateManager(this);
    this.updateCallback = this.gameStateManager.update.bind(
      this.gameStateManager);
    //this.renderCallback = this.gameStateManager.render.bind(
    this.gameRenderer = new GameRenderer(this.width, this.height);
    this.renderCallback = this.gameRenderer.render.bind(
      this.gameRenderer);
    this.gameEngine = new GameEngine(this.updateCallback, this.renderCallback);
    this.colorButtons = [];

    for(let i = 0; i < 4; i++) {
      this.colorButtons.push(new ColorButton(this.width, this.height, i+1, 
        new Audio()));
      this.gameRenderer.addItem.call(this.gameRenderer,
        this.colorButtons[i].sprite);
    }

    this.ctest = new InputState(this.colorButtons);
    this.gameStateManager.changeState(this.ctest);
    this.gameEngine.startGame();
  }
}
