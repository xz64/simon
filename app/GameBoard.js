import PlayingPatternState from './PlayingPatternState';
import GameEngine from './GameEngine';
import GameStateManager from './GameStateManager';
import GameRenderer from './GameRenderer';
import ColorButton from './ColorButton';
import Audio from './Audio';

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

    this.ctest = new ColorButton(this.width, this.height, 1, new Audio());
    this.gameRenderer.addItem.call(this.gameRenderer, this.ctest.sprite);

    this.gameEngine.startGame();
  }
}
