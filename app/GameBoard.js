import PlayingPatternState from './PlayingPatternState';
import GameEngine from './GameEngine';
import GameStateManager from './GameStateManager';
import GameRenderer from './GameRenderer';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameStateManager = new GameStateManager(this);
    this.updateCallback = this.gameStateManager.update.bind(
      this.gameStateManager);
    this.renderCallback = this.gameStateManager.render.bind(
      this.gameStateManager);
    this.gameRenderer = new GameRenderer(this.width, this.height);
    this.gameEngine = new GameEngine(this.updateCallback, this.renderCallback);

    this.gameEngine.startGame();
  }

  update() {
    return (step) => {
      this.gameStateManager.update(step);
    };
  }

  render() {
    return () => {
      this.gameStateManager.render();
    };
  }
}
